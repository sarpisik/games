import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

const REACT_APP_DOMAIN =
    process.env.REACT_APP_DOMAIN || 'http://localhost:3000/';

awsconfig.oauth.redirectSignIn = REACT_APP_DOMAIN;
awsconfig.oauth.redirectSignOut = REACT_APP_DOMAIN + 'signout/';

Amplify.configure(awsconfig);
