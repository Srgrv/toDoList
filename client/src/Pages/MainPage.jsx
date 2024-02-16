import React from "react";

//components
import List from "../Components/List";

const MainPage = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "calc(100vh - 50px)",
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
