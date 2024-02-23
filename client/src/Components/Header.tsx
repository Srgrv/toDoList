import React from "react";

const Header: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "50px",
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      My Todos
    </div>
  );
};

export default Header;
