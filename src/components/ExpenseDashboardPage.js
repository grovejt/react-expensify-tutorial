import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseTotals from "./ExpensesSummary";
import ExpenseListFilters from "./ExpenseListFilters";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseTotals />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
