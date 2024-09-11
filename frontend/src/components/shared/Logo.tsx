import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <Link
      to={"/"}
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        textDecoration: "none",
        marginRight: "auto",
      }}
    >
      <img
        src="sunflower.png"
        alt="sunflower"
        width={"30px"}
        height={"30px"}
        className="sunflower"
      />
      <Typography
        sx={{
          display: "bolck",
          mr: "auto",
          fontWeight: "600",
          fontSize: "22px",
        }}
      >
        Sunnie
      </Typography>
    </Link>
  );
};

export default Logo;
