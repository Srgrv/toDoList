import React, { useState } from "react";

const array = [1, 2, 3, 4, 5, 6];

const TestPage = () => {
  return (
    <div>
      <ul>
        {array.map((item) => {
          return <TestComponent key={item} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default TestPage;

const TestComponent = ({ item }) => {
  const [checked, isChecked] = useState(false);

  return <li>{item}</li>;
};
