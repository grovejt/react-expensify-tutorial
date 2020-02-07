import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { startRemoveExpense } from "../actions/expenses";

export const ExpenseListItem = ({ id, description, amount, createdAt, startRemoveExpense }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        {" "}
        <h3>{description}</h3>
      </Link>

      <p>
        {numeral(amount / 100).format("$0,0.00")}-{moment(createdAt).format("MMMM Do, YYYY")}
      </p>
      <button
        className="btn btn-primary"
        onClick={e => {
          startRemoveExpense(id);
        }}
      >
        Remove
      </button>
    </div>
  );
};

const mapDispatchToProps = { startRemoveExpense };
export default connect(null, mapDispatchToProps)(ExpenseListItem);
