import React from "react";
import ReactDOM from "react-dom";
import {CategoryList, CategoryItem} from "./index";
import ShoppingListComponent from './ShoppingListComponent';

import {shallow, mount} from "enzyme";
import {List} from "material-ui";

describe("ShoppingListComponent", () => {

    it("should load component * ", () => {
        const div = document.createElement('div');
        ReactDOM.render(<ShoppingListComponent/>, div);
    });

    it("should contain category item", ()=> {

        const wrapper = mount(<ShoppingListComponent/>);

        console.log("test >> ", wrapper.find(CategoryList).find('div').children().length)

        expect( wrapper.find(CategoryList).length > 0 ).toBe(true);

    });

});