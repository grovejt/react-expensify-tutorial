import React, { useState, useEffect } from "react";
import AddOption from "./components/AddOption";
import Header from "./components/Header";
import Action from "./components/Action";
import Options from "./components/Options";

const IndecisionApp = props => {
  //const title = "Indecision";
  const subtitle = "Put your life in the hands of a computer";
  //const optionsData = ["Thing one", "Thing two", "Thing three"];
  // make this a function so that it only runs the first time:
  const initialOptions = () => {
    try {
      return JSON.parse(window.localStorage.getItem("options")) || props.options;
    } catch (error) {
      return props.options;
    }
  };
  const [options, setOptionsState] = useState(initialOptions);

  // const prevOptionsRef = React.useRef(); //b
  useEffect(() => {
    // if (!prevOptions || prevOptions.length != options.length) { //b
    //console.log("saving data", "current", options); //b
    window.localStorage.setItem("options", JSON.stringify(options));
    // console.log("saving data", "prev", prevOptions, "current", options); //b
    // prevOptionsRef.current = options; //b
    // }
  }, [options]); //the second argument '[options]' prevents the callback from running unless options has changed, uncomment a lines to get this to work.
  // const prevOptions = prevOptionsRef.current; //b

  const handlePick = () => {
    const randomNumber = Math.floor(Math.random() * options.length);
    const option = options[randomNumber];
    alert(option);
  };

  const handleDeleteOptions = () => {
    if (options.length > 0) {
      //a
      setOptionsState([]);
    }
    //console.log(props); //a
  };

  const handleDeleteOption = option => {
    console.log("hdo", option);
    setOptionsState(options.filter(o => o !== option));
  };

  const handleAddOption = optionToAdd => {
    if (!optionToAdd) {
      return "Enter valid value to add item";
    } else if (options.indexOf(optionToAdd) > -1) {
      return "This option already exists";
    }
    //setOptionsState([...options, optionToAdd]);
    //setOptionsState(options.concat([optionToAdd]));
    setOptionsState(options.concat(optionToAdd));
    //console.log(options);
  };

  return (
    <div>
      <Header subtitle={subtitle} />
      <Action hasOptions={options.length > 0} handlePick={handlePick} />
      <Options options={options} handleDeleteOptions={handleDeleteOptions} handleDeleteOption={handleDeleteOption} />
      <AddOption handleAddOption={handleAddOption} />
    </div>
  );
};

IndecisionApp.defaultProps = {
  options: ["Thing one", "Thing two", "Thing three"]
};

export default IndecisionApp;
