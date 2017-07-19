//webpack-dev-server --hot
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import Pokedex from './components/pokedex/Pokedex.jsx';
import Pokemon from './components/pokedex/Pokemon.jsx';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

const withAppLayout = Component => props => <App><Component {...props} /></App>

const RouteApp = () => (
    <div>
        <Router history={history}>
            <Route exact path="/" component={Pokedex} />
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