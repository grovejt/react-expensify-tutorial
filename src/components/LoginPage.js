import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = props => {
  const loginOnClick = e => {
    console.log("loginOnClick");
    props.startLogin();
    //props.history.push("/dashboard");
  };

  return (
    <div>
      <h1>Budgets</h1>
      <p>It's time to get your expenses under control.</p>
      <button onClick={loginOnClick}>Login</button>
    </div>
  );
};

const mapDispatchToProps = { startLogin };

const mapStateToProps = state => {
  return {
    expenses: ""
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
