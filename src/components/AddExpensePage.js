import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { startAddExpense } from "../actions/expenses";

export const AddExpensePage = props => {
  const addExpense = expense => {
    props.startAddExpense(expense);
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

const mapDispatchToProps = { startAddExpense };

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
