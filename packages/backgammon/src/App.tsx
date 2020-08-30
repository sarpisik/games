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
            <Route
                exact
                path="/rooms"
                render={({ match: { url } }) => (
                    <React.Fragment>
                        <Route path={`${url}/`} component={Rooms} exact />
                        <Route path={`${url}/:id`} component={Room} exact />
                        <Route path={`${url}/:id/:gameId`} component={Game} />
                    </React.Fragment>
                )}
            />
        </Switch>
    );
}
