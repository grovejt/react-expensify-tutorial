import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { startRemoveExpense } from "../actions/expenses";

export const ExpenseListItem = ({ id, description, amount, createdAt, startRemoveExpense }) => {
  return (
    <Link className="list-item" to={`/edit/${id}`}>
      <div>
        <h3 className="list-item__title">{description}</h3>
        <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
      </div>
      <h3 className="list-item__data">{numeral(amount / 100).format("$0,0.00")}</h3>
    </Link>
  );
};

const mapDispatchToProps = { startRemoveExpense };
export default connect(null, mapDispatchToProps)(ExpenseListItem);

{
  /*  
export const ExpenseListItemOld = ({ id, description, amount, createdAt, startRemoveExpense }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
        <p>
          {numeral(amount / 100).format("$0,0.00")}-{moment(createdAt).format("MMMM Do, YYYY")}
        </p>
      </Link>

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

*/
}
