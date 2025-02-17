# LLM-Powered Chatbot with RAG Support

This project demonstrates a chatbot built using an LLM API (currently Gemini) and enhanced with Retrieval Augmented Generation (RAG) capabilities.  It leverages the power of LLMs for general tasks like searching, question answering, and chatting, while also allowing users to upload PDFs for targeted information retrieval.

<img width="700" alt="Basic chat" src="https://github.com/user-attachments/assets/473bd8d7-6a16-4fb5-8786-ee8966e69301" />

<img width="700" alt="Chat based on uploaded PDF document" src="https://github.com/user-attachments/assets/8b453d3b-31be-4ef2-8109-1cf2890190a7" />


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges and Learnings](#challenges-and-learnings)
- [Future Improvements](#future-improvements)

## Features

* **LLM Integration:**  Leverages the Gemini API for core chatbot functionalities, including:
    * General conversation and chat.
    * Information retrieval and search.
    * Question answering.
* **Retrieval Augmented Generation (RAG):** Enables users to upload PDF documents and query them directly. The chatbot uses LangChain to process the document, create embeddings, and perform semantic search, allowing for highly relevant responses grounded in the provided document.
* **User-Friendly Interface:** Built with Vite, React and Material UI for a responsive and intuitive user experience.
* **Data Persistence:** Uses MongoDB to store user data and potentially uploaded documents.
* **Backend API:**  Built with Express.js and TypeScript for a robust and scalable backend.
* **Security:** Included user authentication and authorization system. Uses JWT authorization tokens, HTTP only cookies. Protects user routes with verification checks.

## Technologies Used

* **Programming Languages:** TypeScript, JavaScript
* **Frontend:** React
* **Backend:** Express.js
* **Database:** MongoDB
* **LLM API:** Gemini
* **LLM Framework:** LangChain
* **Other:** Node.js, npm

## Project Structure
```
Chatbot/
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── chat/
│   │   │   ├── shared/
│   │   │   ├── Header.tsx
│   │   ├── context/     # React context
│   │   ├── pages/       # React pages
│   │   │   ├── Login.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── ...
│   │   ├── App.tsx      # Main application component
│   ├── package.json
│   ├── ...
├── backend/             # Express.js backend
│   ├── src/
│   │   ├── controllers/ # API controllers
│   │   │   ├── chat-controllers.ts
│   │   │   ├── user-controllers.ts
│   │   ├── routes/      # API routes
│   │   │   ├── chat-routes.ts
│   │   │   ├── user-routes.ts
│   │   │   ├── ...
│   │   ├── models/      # Database models
│   │   ├── app.ts       # Express app configuration (middleware, routes, etc.)
│   │   ├── index.ts     # Main server file (starts the server, connects to DB, etc.)
│   ├── ...
├── ...
└── README.md
```

## Installation

1. Clone the repository: `git clone https://github.com/cherylcy/Chatbot.git`
2. Navigate to the project directory: `cd Chatbot`
3. Install server-side dependencies: `cd backend && npm install`
4. Install client-side dependencies: `cd frontend && npm install`
5. Configure environment variables: Create a `.env` file in the `backend` directory and add your Gemini API key, MongoDB connection string, JWT secret, and cookie secret.  (Example: `GEMINI_API_KEY=your_api_key`, `MONGODB_URI=your_mongodb_uri`, `JWT_SECRET=your_jwt_secret`, `COOKIE_SECRET=your_cookie_secret`)
6. Start the development server: `cd frontend && npm run dev`  and `cd backend && npm start`

## Usage

1. Open the application in your browser (usually `http://localhost:5173`).
2. Interact with the chatbot by typing your messages in the chat window.
3. To use RAG, upload a PDF document using the provided interface. Once uploaded, you can ask questions related to the content of the PDF.

## Challenges and Learnings

* **Integrating LangChain with Gemini:**  One of the challenges was effectively integrating LangChain with the Gemini API.  This involved understanding how to structure prompts and manage the flow of information between LangChain and Gemini to achieve optimal RAG performance.  I learned a lot about prompt engineering and how to tailor prompts for specific tasks.
* **Handling PDF Uploads and Processing:** Implementing the PDF upload and processing pipeline presented some challenges.  I gained valuable experience in working with file uploads, parsing PDF content, and creating vector embeddings for semantic search.

## Future Improvements

* **Improved Error Handling:** Implement more robust error handling to gracefully manage unexpected situations and provide informative feedback to the user.
* **Enhanced User Interface:**  Explore ways to improve the user interface, such as adding support for different chat styles, displaying document context alongside responses, and providing better feedback on the status of PDF processing.
* **More Advanced RAG Features:**  Investigate more advanced RAG techniques, such as incorporating multiple documents, handling different file types, and implementing more sophisticated search algorithms.
* **Deployment:** Deploy the chatbot to a cloud platform to make it publicly accessible.
