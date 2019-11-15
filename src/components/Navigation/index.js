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
    <Navbar expand="lg" variant="dark" bg="dark">
        <Link className="navbar-brand" to={ROUTES.HOME}>Kingdom Boxing</Link>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to={ROUTES.HOME}>Event</Link>
                <Link className="nav-link" to={ROUTES.CONTACT_US}>Contact Us</Link>
            </Nav>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser? <NavigationAuth3 authUser={authUser} /> : <NavigationNonAuth3 />
                }
            </AuthUserContext.Consumer>
        </Navbar.Collapse>
    </Navbar>
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

const NavigationAuth2 = ({ authUser }) => (
    <Navbar expand="lg" variant="dark" bg="dark">
        <Link className="navbar-brand" to={ROUTES.HOME}>Kingdom Boxing</Link>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to={ROUTES.HOME}>Event</Link>
                <Link className="nav-link" to={ROUTES.CONTACT_US}>Contact Us</Link>
            </Nav>
            <Nav>
                <NavDropDown title={<FontAwesomeIcon icon="user-circle" size="2x" />} alignRight>
                    <NavItem className="navbar-text navdropdown">{authUser.email}</NavItem>
                    <NavDropDown.Divider />
                    <NavDropDown.Item><Link className="nav-link" to={ROUTES.ACCOUNT}>Account</Link></NavDropDown.Item>
                    <NavItem><SignOutButton /></NavItem>
                </NavDropDown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar expand="lg" variant="dark" bg="dark">
        <Link className="navbar-brand" to={ROUTES.HOME}>Kingdom Boxing</Link>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to={ROUTES.HOME}>Event</Link>
                <Link className="nav-link" to={ROUTES.CONTACT_US}>Contact Us</Link>
            </Nav>
            <Nav>
                <Link className="nav-link" to={ROUTES.HOME}><FontAwesomeIcon icon={['fab', 'facebook']} size="lg" /></Link>
                <Link className="nav-link" to={ROUTES.HOME}><FontAwesomeIcon icon={['fab', 'instagram']} size="lg" /></Link>
                <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const NavigationAuth3 = ({ authUser }) => (
    <Nav>
        <NavDropDown title={<FontAwesomeIcon icon="user-circle" size="lg" />} alignRight>
            <NavItem className="dropdown-item">{authUser.email}</NavItem>
            <NavDropDown.Divider />
            {!!authUser.roles[ROLES.ADMIN] && (
                <NavDropDown.Item><Link className="dropdown-item" to={ROUTES.ADMIN}>Admin Dashboard</Link></NavDropDown.Item>
            )}
            <NavDropDown.Item><Link className="dropdown-item" to={ROUTES.ACCOUNT}>Account</Link></NavDropDown.Item>
            <NavItem><SignOutButton /></NavItem>
        </NavDropDown>
    </Nav>
);

const NavigationNonAuth3 = () => (
    <Nav>
        <Link className="nav-link" to={ROUTES.HOME}><FontAwesomeIcon icon={['fab', 'facebook']} size="lg" /></Link>
        <Link className="nav-link" to={ROUTES.HOME}><FontAwesomeIcon icon={['fab', 'instagram']} size="lg" /></Link>
        <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
    </Nav>
);


export default Navigation;