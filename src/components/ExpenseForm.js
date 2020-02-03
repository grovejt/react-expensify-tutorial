import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

const ExpenseForm = props => {
  // State:
  const [expense, setExpense] = useState({
    description: props.expense ? props.expense.description : "",
    amount: props.expense ? (props.expense.amount / 100).toString() : "",
    note: props.expense ? props.expense.note : ""
    //createdAt: props.expense ? moment(props.expense.createdAt) : moment()
  });
  // must break date into separate state due to buggy airbnb date picker:
  const [calDate, setCalDate] = useState(props.expense ? moment(props.expense.createdAt) : moment());
  const [calendarFocused, setCalendarFocused] = useState(false);
  const [error, setError] = useState(false);

  // Handlers:
  const onDescriptionChange = e => {
    setExpense({
      ...expense,
      description: e.target.value
    });
  };

  const onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setExpense({
        ...expense,
        amount: amount
      });
    }
  };

  const onDateChange = createdAt => {
    console.log("onDateChange", createdAt);
    if (createdAt) {
      setCalDate(createdAt);
    }
    // setExpense({
    //   ...expense,
    //   createdAt
    // });
  };

  const onCalendarFocusChange = ({ focused }) => {
    console.log("onCalendarFocusChange", focused, calendarFocused);

    setCalendarFocused(focused);
  };

  const onNoteChange = e => {
    setExpense({
      ...expense,
      note: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!expense.description || !expense.amount) {
      setError(true);
    } else {
      setError(false);
      const formattedAmount = parseFloat(expense.amount, 10) * 100;
      const timestamp = calDate.valueOf();
      props.onSubmit({
        ...expense,
        amount: formattedAmount,
        createdAt: timestamp
      });
    }
  };

  return (
    <div>
      {error ? <p>Please enter both a description and an amount!</p> : ""}

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Description"
          autoFocus
          value={expense.description}
          onChange={onDescriptionChange}
        />
        <input type="text" placeholder="Amount" value={expense.amount} onChange={onAmountChange} />

        <SingleDatePicker
          id="your_unique_id" // PropTypes.string.isRequired,
          date={calDate} // momentPropTypes.momentObj or null
          onDateChange={onDateChange} // PropTypes.func.isRequired
          focused={calendarFocused} // PropTypes.bool
          onFocusChange={onCalendarFocusChange} // PropTypes.func.isRequired
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

        <br />
        <textarea placeholder="Add a note for your expense (optional)" value={expense.note} onChange={onNoteChange} />
        <button className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
