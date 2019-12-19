import React, { Component } from 'react';
import { compose } from 'recompose';
import { Switch, Route, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import { AddEventForm, EventList, EventItem } from '../Event';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
    <Container>
        <Row>
            <Col>
                <h1>Admin Dashboard </h1>
            </Col>
            <Col>
                <Link to={ROUTES.ADD_EVENT}> 
                    <Button>Add Event</Button>
                </Link>
            </Col>
        </Row>
        <Switch>
            <Route exact path={ROUTES.ADMIN} component={EventList} />
            <Route exact path={ROUTES.EVENT_DETAILS} component={EventItem} />
        </Switch>
    </Container>
)

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(AdminPage);