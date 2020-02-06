import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ExpenseSummary } from "../../components/ExpensesSummary";

// test("should render Expense Summary correctly", () => {
// const wrapper = shallow(<ExpensesSumary />);
// expect(wrapper).toMatchSnapshot();
// });

configure({ adapter: new Adapter() });

describe("<ExpensesSumary/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ExpenseSummary expenseCount={2} expenseTotal={111} />);
  });
  it("should render <ExpensesSumary /> element", () => {
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find(Link)).toHaveLength(1);
  });
});
