import React from "react";
import ShoppingListPage from "./ShoppingListPage";
import sinon from 'sinon';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'


describe("ShoppingListComponent", () => {
    it("should load component * ", () => {
        shallow(<MemoryRouter><ShoppingListPage/></MemoryRouter> )
    });

    it("should call componentDidMount", ()=> {

        sinon.spy(ShoppingListPage.prototype, 'componentDidMount');
        //TODO more test here
        const wrapper = mount(<MemoryRouter><ShoppingListPage/></MemoryRouter> );
        expect(ShoppingListPage.prototype.componentDidMount.calledOnce).toBe(true);
    });
});