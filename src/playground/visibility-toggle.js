const VisibilityToggle = () => {
  const [isVisible, setVisibility] = React.useState(false);
  const buttonLabels = ["Show Details", "Hide Details"];
  const toggleVisibility = () => {
    console.log("isVisible", isVisible);
    setVisibility(!isVisible);
  };
  return (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={toggleVisibility}>{buttonLabels[isVisible ? 1 : 0]}</button>
      {isVisible && <p>Hey. These are some details you can now see!</p>}
    </div>
  );
};
const appRoot = document.getElementById("app");
ReactDOM.render(<VisibilityToggle />, appRoot);

// const appRoot = document.getElementById("app");
// let buttonLabels = ["Show Details", "Hide Details"];
// let isVisible = false;

// const toggleVisibility = () => {
//   isVisible = !isVisible;
//   render();
// };
// const render = () => {
//   const jsx = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={toggleVisibility}>{buttonLabels[isVisible ? 1 : 0]}</button>
//       {isVisible && <p>Hey. These are some details you can now see!</p>}
//     </div>
//   );
//   ReactDOM.render(jsx, appRoot);
// };

// render();
