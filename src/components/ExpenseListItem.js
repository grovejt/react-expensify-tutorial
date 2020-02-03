import React from "react";
import { connect } from "react-redux";
import { removeExpense } from "../actions/expenses";
import { Link } from "react-router-dom";

export const ExpenseListItem = ({ id, description, amount, createdAt, removeExpense }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        {" "}
        <h3>{description}</h3>
      </Link>

      <p>
        {amount} - {createdAt}
      </p>
      <button
        className="btn btn-primary"
        onClick={e => {
          removeExpense(id);
        }}
      >
        Remove
      </button>
    </div>
  );
};

const mapDispatchToProps = { removeExpense };
export default connect(null, mapDispatchToProps)(ExpenseListItem);
