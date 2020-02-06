import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ExpenseListItem } from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

// test("should render ExpenseListItem correctly", () => {
//   const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
//   expect(wrapper).toMatchSnapshot();
// });

configure({ adapter: new Adapter() });

describe("<ExpenseListItem/>", () => {
  it("should render <ExpenseListItem /> elements", () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
