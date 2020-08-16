import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Home } from './views';

/*
 * TODO:
 * - [x] fix opponent's point draggable on broken point.
 * - [] calculate mars.
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
