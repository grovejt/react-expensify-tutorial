import React, { useState, useEffect } from "react";
import AddOption from "./AddOption";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import OptionModal from "./OptionModal";

const IndecisionApp = props => {
  const subtitle = "Put your life in the hands of a computer";
  // make this a function so that it only runs the first time:
  const initialOptions = () => {
    try {
      return JSON.parse(window.localStorage.getItem("options")) || props.options;
    } catch (error) {
      return props.options;
    }
  };
  const [options, setOptionsState] = useState(initialOptions);

  const [selectedOption, setSelectedOption] = useState();

  // const prevOptionsRef = React.useRef(); //b
  useEffect(() => {
    // if (!prevOptions || prevOptions.length != options.length) { //b
    window.localStorage.setItem("options", JSON.stringify(options));
    // prevOptionsRef.current = options; //b
    // }
  }, [options]); //the second argument '[options]' prevents the callback from running unless options has changed, uncomment a lines to get this to work.
  // const prevOptions = prevOptionsRef.current; //b

  const handlePick = () => {
    const randomNumber = Math.floor(Math.random() * options.length);
    const option = options[randomNumber];
    setSelectedOption(option);
  };
  const handleClearSelectedOption = () => {
    setSelectedOption();
  };

  const handleDeleteOptions = () => {
    if (options.length > 0) {
      //a
      setOptionsState([]);
    }
  };

  const handleDeleteOption = option => {
    setOptionsState(options.filter(o => o !== option));
  };

  const handleAddOption = optionToAdd => {
    if (!optionToAdd) {
      return "Enter valid value to add item";
    } else if (options.indexOf(optionToAdd) > -1) {
      return "This option already exists";
    }
    //setOptionsState([...options, optionToAdd]);
    setOptionsState(options.concat(optionToAdd));
  };

  return (
    <div>
      <Header subtitle={subtitle} />
      <div className="container">
        <Action hasOptions={options.length > 0} handlePick={handlePick} />
        <div className="widget">
          <Options options={options} handleDeleteOptions={handleDeleteOptions} handleDeleteOption={handleDeleteOption} />
          <AddOption handleAddOption={handleAddOption} />
        </div>
        <OptionModal selectedOption={selectedOption} handleClearSelectedOption={handleClearSelectedOption} />
      </div>
    </div>
  );
};

IndecisionApp.defaultProps = {
  options: ["Thing one", "Thing two", "Thing three"]
};

export default IndecisionApp;
