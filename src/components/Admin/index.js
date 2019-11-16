import React, { Component } from 'react';
import { compose } from 'recompose';
import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import { AddEventForm, EventList, EventItem } from '../Event';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
    <Container>
        <AddEventForm />
        <Switch>
            <Route exact path={ROUTES.EVENT_DETAILS} component={EventItem} />
            <Route exact path={ROUTES.ADMIN} component={EventList} />
        </Switch>
    </Container>
)

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(AdminPage);