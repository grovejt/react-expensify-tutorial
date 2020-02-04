import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseTotals from "./ExpensesSumary";
import ExpenseListFilters from "./ExpenseListFilters";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseTotals />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
