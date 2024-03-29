import React from "react";

//components
import List from "../Components/List";

const MainPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "SlateGray",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <List />
    </div>
  );
};

export default MainPage;
