import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Room, Rooms } from './views';
import { withAuthentication } from './components';

/*
 * TODO:
 * - [] issue invalid available triangle calculation.
 * - [] display only round player related errors.
 * - [] add surrender button.
 * - [] calculate mars.
 */

export default withAuthentication(App);

function App() {
    return (
        <Switch>
            <Route exact path="/:id/:gameId">
                <Game />
            </Route>
            <Route exact path="/:id">
                {/* <Game /> */}
                <Room />
            </Route>
            <Route exact path="/">
                <Rooms />
            </Route>
        </Switch>
    );
}
