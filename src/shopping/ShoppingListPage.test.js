import React from "react";
import ReactDOM from "react-dom";
import ShoppingListComponent from "./ShoppingListComponent";
import sinon from 'sinon';
import { mount } from 'enzyme';


describe("ShoppingListComponent", () => {

    it("should load component * ", () => {
        const div = document.createElement('div');
        ReactDOM.render(<ShoppingListComponent/>, div);
    });

    it("should call componentDidMount", ()=> {

        sinon.spy(ShoppingListComponent.prototype, 'componentDidMount');
        //TODO more test here
        const wrapper = mount(<ShoppingListComponent/>);
        expect(ShoppingListComponent.prototype.componentDidMount.calledOnce).toBe(true);

    });
});