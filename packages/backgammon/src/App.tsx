import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Game, Room, Rooms, Home, NotFound, Profile, GameDemo } from './views';
import { withAuthentication } from './components';
import { ROUTES } from './configs';

/*
 * TODO:
 * - [] display only round player related errors.
 * - [] add surrender button.
 */

export default withAuthentication(App);

function App() {
    return (
        <Switch>
            <Redirect exact from={ROUTES.SIGN_OUT} to={ROUTES.HOME} />
            <Route path={ROUTES.HOME} component={Home} exact />
            <Route path={ROUTES.GAME_DEMO} component={GameDemo} exact />
            <Route path={ROUTES.PROFILE} component={Profile} exact />
            <Route
                path={ROUTES.ROOMS}
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
