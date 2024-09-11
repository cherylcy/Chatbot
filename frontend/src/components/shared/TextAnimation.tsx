import { TypeAnimation } from "react-type-animation";
import { Typography } from "@mui/material";

const TextAnimation = ({ text }: { text: string }) => {
  return (
    <Typography variant="h3" textAlign="center" fontWeight={600}>
      <TypeAnimation
        sequence={[text, 5000]}
        style={{
          whiteSpace: "pre-line",
          fontSize: "30px",
          color: "#495753",
          display: "inline-block",
        }}
        omitDeletionAnimation={true}
        repeat={0}
        cursor={false}
      />
    </Typography>
  );
};

export default TextAnimation;
