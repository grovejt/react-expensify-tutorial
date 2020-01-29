//import React, { useState, useEffect } from "react";
//const { Component } = React;

const Counter = props => {
  const [count, setCount] = React.useState(props.count);
  const addOne = () => {
    setCount(count + 1);
    console.log("addOne clicked!", count);
  };
  const minusOne = () => {
    setCount(count - 1);
    console.log("minusOne clicked!", count);
  };
  const reset = () => {
    setCount(0);
    console.log("reset clicked!", count);
  };
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne} className="button">
        +1
      </button>
      <button onClick={minusOne} className="button">
        -1
      </button>
      <button onClick={reset} className="button">
        reset
      </button>
    </div>
  );
};

Counter.defaultProps = {
  count: 0
};
const appRoot = document.getElementById("app");
ReactDOM.render(<Counter count="3" />, appRoot);

// let count = 0;
// const addOne = () => {
//   count++;
//   console.log("addOne clicked!", count);
//   renderCounterApp();
// };
// const minusOne = () => {
//   count--;
//   console.log("minusOne clicked!", count);
//   renderCounterApp();
// };
// const reset = () => {
//   count = 0;
//   console.log("reset clicked!", count);
//   renderCounterApp();
// };

// const appRoot = document.getElementById("app");

// const renderCounterApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne} className="button">
//         +1
//       </button>
//       <button onClick={minusOne} className="button">
//         -1
//       </button>
//       <button onClick={reset} className="button">
//         reset
//       </button>
//     </div>
//   );
//   ReactDOM.render(templateTwo, appRoot);
// };

// renderCounterApp();
