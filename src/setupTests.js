/**
 * Created by eliasmj on 02/02/2017.
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const baseUrl = 'https://week-menu-api.herokuapp.com/';
const mock = new MockAdapter(axios);


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const fakeIngredients = [{name: 'ingred name 2', _id: '123', attributes: [{name: 'attr', _id: '2'}]}];

const fakeCategories = [
    {name: 'category 1', ingredients: fakeIngredients},
    {name: 'category 2', ingredients: fakeIngredients}
];

//mock api
mock.onGet(baseUrl + 'recipe/week').reply(200,
    [{name: 'recipe 1', isInMenuWeek: true}, {name: 'test 2', isInMenuWeek: false}]
);

mock.onGet(baseUrl + 'recipe').reply(200,
    [{name: 'recipe 2', isInMenuWeek: false}, {name: 'test 2', isInMenuWeek: false}]
);

mock.onGet(baseUrl + 'recipe/1').reply(200,
    [{name: 'recipe 1', isInMenuWeek: false}, {name: 'test 1', isInMenuWeek: false}]
);

mock.onGet(baseUrl + 'category/week/shopping').reply(200, fakeCategories);