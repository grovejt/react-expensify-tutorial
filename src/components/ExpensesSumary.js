import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  return (
    <div>
      <h1>
        Viewing {expenseCount} expense{expenseCount === 1 ? "" : "s"} totalling{" "}
        {numeral(expenseTotal / 100).format("$0,00.00")}
      </h1>
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
