import React from 'react';
import ReactDOM from 'react-dom';

import './aws.config';

import { Router } from 'react-router';
import { history } from './lib';

import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
