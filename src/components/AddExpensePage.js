import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { addExpense } from "../actions/expenses";

const AddExpensePage = props => {
  const addExpense = expense => {
    props.addExpense(expense);
    props.history.push("/");
  };
  return (
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm onSubmit={addExpense} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    expenses: state.expenses
  };
};

const mapDispatchToProps = { addExpense };

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
