import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavDropDown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = ({ authUser }) => (
    <Navbar variant="dark" bg="dark">
        <Link className="navbar-brand" to={ROUTES.HOME}>Kingdom Boxing</Link>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to={ROUTES.EVENT}>Event</Link>
                <Link className="nav-link" to={ROUTES.CONTACT_US}>Contact Us</Link>
            </Nav>
            <Nav>
                <Link className="nav-link" to={ROUTES.HOME}><FontAwesomeIcon icon={['fab', 'facebook']} size="lg" /></Link>
                <Link className="nav-link" to={ROUTES.HOME}><FontAwesomeIcon icon={['fab', 'instagram']} size="lg" /></Link>
            </Nav>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
                }
            </AuthUserContext.Consumer>
        </Navbar.Collapse>
    </Navbar>
);

const NavigationAuth = ({ authUser }) => (
    <Nav>
        <NavDropDown title={<FontAwesomeIcon icon="user-circle" size="lg" />} alignRight>
            <NavItem className="dropdown-item">{authUser.email}</NavItem>
            <NavDropDown.Divider />
            {!!authUser.roles[ROLES.ADMIN] && (
                <Link className="dropdown-item" to={ROUTES.ADMIN}>Admin Dashboard</Link>
            )}
            <Link className="dropdown-item" to={ROUTES.ACCOUNT}>Account</Link>
            <NavItem><SignOutButton /></NavItem>
        </NavDropDown>
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav>
        
        <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
    </Nav>
);

export default Navigation;