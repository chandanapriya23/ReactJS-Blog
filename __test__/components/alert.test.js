import 'jsdom-global/register';
import React from "react";
import AlertMessage from '../../src/components/alert';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("Alert", () => {
    it("1.Alert Message", () => {
        const component = shallow(<AlertMessage />);
    })
})