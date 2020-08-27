import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Room, Rooms } from './views';

/*
 * TODO:
 * - [] issue invalid available triangle calculation.
 * - [] display only round player related errors.
 * - [] add surrender button.
 * - [] calculate mars.
 */

export default function App() {
    return (
        <Switch>
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
