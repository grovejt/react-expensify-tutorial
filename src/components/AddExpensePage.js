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
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Add Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm onSubmit={addExpense} />
      </div>
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
