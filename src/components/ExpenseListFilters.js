import React, { useState } from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";
import { DateRangePicker } from "react-dates";

export const ExpenseListFilters = props => {
  //State
  const [calendarFocused, setCalendarFocused] = useState(null);

  const onDatesChange = ({ startDate, endDate }) => {
    props.setStartDate(startDate);
    props.setEndDate(endDate);
  };

  const onCalendarFocusChange = focused => {
    //console.log("onCalendarFocusChange", focused, calendarFocused);
    setCalendarFocused(focused);
  };

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item">
          {/*   <span>Filter: </span>*/}
          <input
            className="text-input"
            placeholder="search expenses"
            type="text"
            value={props.filters.text}
            onChange={e => {
              props.setTextFilter(e.target.value);
            }}
          />
        </div>
        <div className="input-group__item">
          {/*  <span>Sort By: </span>*/}
          <select
            className="select"
            value={props.filters.sortBy}
            onChange={e => {
              // console.log(e.target.value);
              if (e.target.value === "date") {
                props.sortByDate();
              } else if (e.target.value === "amount") {
                props.sortByAmount();
              }
            }}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div className="input-group__item">
          {/*   <span>Date Filter: </span>*/}
          <DateRangePicker
            startDate={props.filters.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={props.filters.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={onDatesChange} // PropTypes.func.isRequired,
            focusedInput={calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={onCalendarFocusChange} // PropTypes.func.isRequired,
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate };

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
