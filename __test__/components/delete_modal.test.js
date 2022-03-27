import 'jsdom-global/register';
import React from "react";
import { render, screen } from '@testing-library/react';
import DeleteModal from '../../src/components/delete_modal';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("Delete Modal Test", () => {

  it("1.Delete Modal", () => {
    const component = shallow(<DeleteModal />);
    component.setProps({
      onDelete: jest.fn(),
      setShowDeleteModal: jest.fn()
    });
    component.find('Button').at(0).props().onClick();
    component.find('Modal').at(0).props().onHide();
    component.find('Button').at(1).props().onClick();
  })
})