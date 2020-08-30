import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Game, Room, Rooms, Home, NotFound } from './views';
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
                path="/rooms"
                render={({ match: { path } }) => (
                    <React.Fragment>
                        <Route path={path} component={Rooms} exact />
                        <Route path={`${path}/:id`} component={Room} exact />
                        <Route path={`${path}/:id/:gameId`} component={Game} />
                    </React.Fragment>
                )}
            />
            <Route component={NotFound} />
        </Switch>
    );
}
