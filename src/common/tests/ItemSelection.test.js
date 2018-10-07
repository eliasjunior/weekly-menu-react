import React from 'react';
import { shallow, mount } from 'enzyme';
import ItemSelection from '../ItemSelection';

describe('Item Selection', () => {
    it("should render Item selection" , () => {
        const props = {
            product: {
                name: 'test',
                _id: 1
            }
        }
        shallow(<ItemSelection {...props}/>)
    })
    it("should be checked", () => {
        const props = {
            product: {
                name: 'test',
                _id: 1,
                checked: false
            }
        }

        const wrapper = mount(<ItemSelection {...props}/>)

        console.log('**', wrapper.find('input[type="checkbox"]'))

        expect(wrapper.find('input[type="checkbox"]')).toBeChecked()

    })
})