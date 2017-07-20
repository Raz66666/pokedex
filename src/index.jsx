//webpack-dev-server --hot
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import PokemonsShow from './components/pokedex/PokemonsShow.jsx';
import Pokemon from './components/pokedex/Pokemon.jsx';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

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
        <RouteApp />,
        document.getElementById('app')
        );