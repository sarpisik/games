import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Home } from './views';

/*
 * TODO:
 * - [x]render broken points.
 * - [x]calculate double dice. e.g 3-3
 * - [x]calculate the movement availability before draggable
 *   and skip the round on invalid.
 * - [x]calculate when game finishes.
 * - []highlight available triangles on drag move.
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
