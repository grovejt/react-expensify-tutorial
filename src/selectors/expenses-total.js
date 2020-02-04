/**
 * getExpensesTotal(expenses) - returns total of all expense amounts.
 *
 * @param {empty, expense, array} - The expenses to be totaled.
 * import getExpensesTotal from "../selectors/expenses-total";
 *
 **/
export default (expenses = []) => {
  // prettier-ignore
  return Array.isArray(expenses) ? 
    expenses.map(expense => expense.amount).reduce((sum, value) => sum + value, 0) : 
    expenses.amount;
};
