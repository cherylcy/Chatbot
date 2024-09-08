import React from "react";
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
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        Sunny
      </Typography>
    </Link>
  );
};

export default Logo;
