import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Home } from './views';

/*
 * TODO:
 * - [] highlight available triangles on drag move.
 * - [] calculate conrucrrently moves.
 * - [] set path prefix '/backgammon'
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
