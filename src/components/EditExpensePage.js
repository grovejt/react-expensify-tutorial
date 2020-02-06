import React from "react";
import { connect } from "react-redux";
import { editExpense, removeExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

export const EditExpensePage = props => {
  const updateExpense = updatedExpense => {
    // console.log("submitted", updatedExpense);
    // console.log("submitted", { ...updatedExpense });
    props.editExpense(props.expense.id, updatedExpense);
    props.history.push("/");
  };
  return (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm expense={props.expense} onSubmit={updateExpense} />
      <button
        className="btn btn-primary"
        onClick={e => {
          props.removeExpense(props.expense.id);
          props.history.push("/");
        }}
      >
        Remove{" "}
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = { editExpense, removeExpense };

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
