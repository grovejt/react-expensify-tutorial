import React from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

export const EditExpensePage = props => {
  const updateExpense = updatedExpense => {
    // console.log("submitted", updatedExpense);
    // console.log("submitted", { ...updatedExpense });
    props.startEditExpense(props.expense.id, updatedExpense);
    props.history.push("/");
  };
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm expense={props.expense} onSubmit={updateExpense} />
        <button
          className="button button--secondary"
          onClick={e => {
            props.startRemoveExpense(props.expense.id);
            props.history.push("/");
          }}
        >
          Remove Expense
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = { startEditExpense, startRemoveExpense };

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
