from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.vectorstores import InMemoryVectorStore
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.messages import AIMessage, HumanMessage

load_dotenv()

# Gemini Free tier: 15 requests per minute (RPM), 1 million tokens per minute (TPM), and 1,500 requests per day (RPD)

# vertexai.init(project=os.getenv("GOOGLE_PROJECT_ID"))

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", max_output_tokens=1024)

model_name = "sentence-transformers/all-mpnet-base-v2"
model_kwargs = {'device': 'cpu'}
encode_kwargs = {'normalize_embeddings': False}
embeddings = HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)

loader = PyPDFLoader("./data/EMMA- An Emotion-Aware Wellbeing Chatbot.pdf")
pages = []
for page in loader.lazy_load():
    pages.append(page)
# print(f"{pages[0].metadata}\n")
# print(pages[0].page_content)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=5, add_start_index=True)
splits = text_splitter.split_documents(pages)
# vectorstore = InMemoryVectorStore.from_documents(
#     documents=splits, embedding=OpenAIEmbeddings()
# )
vectorstore = InMemoryVectorStore.from_documents(documents=splits, embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

### Contextualize question ###
contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)
contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)

### Answer question ###
system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}"
)
qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)


chat_history = []

question = "What is EMMA?"
ai_msg_1 = rag_chain.invoke({"input": question, "chat_history": chat_history})
print(ai_msg_1["answer"])
chat_history.extend(
    [
        HumanMessage(content=question),
        AIMessage(content=ai_msg_1["answer"]),
    ]
)

second_question = "What does it help with?"
ai_msg_2 = rag_chain.invoke({"input": second_question, "chat_history": chat_history})

print(ai_msg_2["answer"])