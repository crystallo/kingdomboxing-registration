import React from 'react';
import { 
    BrowserRouter as Router,
    Route 
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import HomePage from '../Home';
import PasswordForgetPage from '../PasswordForget';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import ContactUsPage from '../ContactUs';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

library.add(
    faUserCircle,
    fab
);


const App = () => (
    <Router>
        <div>
            <Navigation />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.CONTACT_US} component={ContactUsPage} />
        </div>
    </Router>
);

export default withAuthentication(App);