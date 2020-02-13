import React from 'react';
import InventoryPage from './InventoryPage';
import { shallow } from 'enzyme';

describe("Inventory Page", () => {

    it("should load component", () => {
        // const div = document.createElement('div');
        // ReactDOM.render(<InventoryPage/>, div);
        const pathname = {}
        shallow(<InventoryPage location={pathname} />);

    });

});