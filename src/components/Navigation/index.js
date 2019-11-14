import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = ({ authUser }) => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = ({ authUser }) => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>LANDING</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>HOME</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>ACCOUNT</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
            <li>
                <Link to={ROUTES.ADMIN}>ADMIN</Link>
            </li>
        )}
        <li>
        <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>LANDING</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
        </li>
    </ul>
);

export default Navigation;