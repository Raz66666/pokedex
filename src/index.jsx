//webpack-dev-server --hot
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import PokemonsShow from './components/pokedex/PokemonsShow.jsx';
import Pokemon from './components/pokedex/Pokemon.jsx';

import {createStore} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

const store = createStore(reducer);
store.dispatch({
    type: 'INITIAL_STATE',
    state: {
        ability: [],
        allData: [],
        species: [1,5,7],
        pageOfItems: [],
        next: [],
        prev: [],
        perPage: 100
    }
});

const RouteApp = () => (
    <div>
        <Router history={history}>
            <Route exact path="/" component={PokemonsShow} />
        </Router>
        <Router history={history}>
            <Route exact path="/pokemon/:id" component={Pokemon} />
        </Router>
    </div>
);

ReactDOM.render(
        <Provider store={store}>
            <RouteApp />
        </Provider>,
        document.getElementById('app')
        );