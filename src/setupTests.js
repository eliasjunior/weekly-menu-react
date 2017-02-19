/**
 * Created by eliasmj on 02/02/2017.
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const baseUrl = 'https://week-menu-api.herokuapp.com/';
const mock = new MockAdapter(axios);

//mock api
mock.onGet(baseUrl + 'recipe/week').reply(200,
    [{name: 'test', isInMenuWeek: true}, {name: 'test 2', isInMenuWeek: false}]
);

mock.onGet(baseUrl + 'recipe').reply(200,
    [{name: 'test', isInMenuWeek: false}, {name: 'test 2', isInMenuWeek: false}]
);