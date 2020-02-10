import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount} </span> expense{expenseCount === 1 ? "" : "s"} <span> totalling </span>
          {numeral(expenseTotal / 100).format("$0,00.00")}
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expenseTotal: getExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
