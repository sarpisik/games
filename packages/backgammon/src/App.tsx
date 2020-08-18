import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Home } from './views';

/*
 * TODO:
 * - [] calculate mars.
 * - [x] highlight broken point triangle.
 * - [x] calculate conrucrrently moves.
 */

export default function App() {
    return (
        <Switch>
            <Route exact path="/:id">
                <Game />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    );
}
