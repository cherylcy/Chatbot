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
        width={"45px"}
        height={"45px"}
        className="sunflower"
      />
      <Typography
        sx={{
          display: { md: "bolck", sm: "block", xs: "none" },
          mr: "auto",
          fontWeight: "500",
          fontSize: "22px",
        }}
      >
        Sunnie
      </Typography>
    </Link>
  );
};

export default Logo;
