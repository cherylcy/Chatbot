import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Markdown from "react-markdown";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
  keyIndex,
}: {
  content: string;
  role: "user" | "assistant";
  keyIndex: number;
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  let nameInitials: string = "";
  if (auth?.user?.firstname) nameInitials += auth?.user?.firstname[0];
  if (auth?.user?.lastname) nameInitials += auth?.user?.lastname[0];
  if (nameInitials === "") nameInitials += auth?.user?.username[0];

  const customStyle = {
    fontSize: "14px",
  };

  const codeTagProps = {
    style: {
      fontSize: "inherit",
      lineHeight: "inherit",
    },
  };

  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        my: 2,
      }}
      key={"chatItem" + keyIndex}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "transparent",
          width: "40px",
          height: "40px",
          fontSize: "15px",
          fontWeight: "600",
          m: "3px 10px",
        }}
      >
        <img src="sunflower.png" alt="sunnie" width={"30px"} />
      </Avatar>
      <Box
        sx={{
          p: "10px 16px 10px 16px",
          bgcolor: "#faf6f2",
          borderRadius: 3,
          maxWidth: 0.7,
        }}
      >
        {!messageBlocks && (
          <Typography sx={{ fontSize: "18px", color: "black" }}>
            <Markdown>{content}</Markdown>
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language="javascript"
                customStyle={customStyle}
                codeTagProps={codeTagProps}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "18px", color: "black" }}>
                <Markdown>{block}</Markdown>
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        my: 2,
        flexDirection: "row-reverse",
      }}
      key={"chatItem" + keyIndex}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "#90a8ad",
          color: "white",
          width: "30px",
          height: "30px",
          fontSize: "15px",
          fontWeight: "600",
          p: "5px",
          m: "3px 10px",
        }}
      >
        {nameInitials}
      </Avatar>
      <Box
        sx={{
          p: "10px 16px 10px 16px",
          bgcolor: "#faf6f2",
          borderRadius: 3,
          maxWidth: 0.7,
        }}
      >
        {!messageBlocks && (
          <Typography sx={{ fontSize: "18px", color: "black" }}>
            <Markdown>{content}</Markdown>
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language="javascript"
                customStyle={customStyle}
                codeTagProps={codeTagProps}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "18px", color: "black" }}>
                <Markdown>{block}</Markdown>
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
