import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAuthentication } from './components';
import { ROUTES } from './configs';
import {
    Game,
    GameDemo,
    Home,
    Locales,
    NotFound,
    Profile,
    Room,
    Rooms,
} from './views';

/*
 * TODO:
 * - [x] render country flag. Navigate on click.
 * - [] localize game feedbacks.
 * - [] display only round player related errors.
 */

export default withAuthentication(App);

function App() {
    return (
        <Switch>
            <Redirect exact from={ROUTES.SIGN_OUT} to={ROUTES.HOME} />
            <Route path={ROUTES.HOME} component={Locales} exact />
            <Route
                path="/:lang"
                render={({ match: { path } }) => (
                    <React.Fragment>
                        <Route path={path} component={Home} exact />
                        <Route
                            path={`${path}${ROUTES.GAME_DEMO}`}
                            component={GameDemo}
                            exact
                        />
                        <Route
                            path={`${path}${ROUTES.PROFILE}`}
                            component={Profile}
                            exact
                        />
                        <Route
                            path={`${path}${ROUTES.ROOMS}`}
                            render={({ match: { path } }) => (
                                <React.Fragment>
                                    <Route
                                        path={path}
                                        component={Rooms}
                                        exact
                                    />
                                    <Route
                                        path={`${path}/:id`}
                                        component={Room}
                                        exact
                                    />
                                    <Route
                                        path={`${path}/:id/:gameId`}
                                        component={Game}
                                    />
                                </React.Fragment>
                            )}
                        />
                    </React.Fragment>
                )}
            />
            <Route component={NotFound} />
        </Switch>
    );
}
