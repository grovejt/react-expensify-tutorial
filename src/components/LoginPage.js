import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = props => {
  const loginOnClick = e => {
    // console.log("loginOnClick");
    props.startLogin();
    //props.history.push("/dashboard");
  };

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Budgets</h1>
        <p>It's time to get your expenses under control.</p>
        <button className="button" onClick={loginOnClick}>
          Login
        </button>
      </div>
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
