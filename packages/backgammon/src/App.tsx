import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Game, Room, Rooms, Home } from './views';
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
            <Redirect exact from="/signout" to="/" />
            <Route path="/" component={Home} exact />
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
