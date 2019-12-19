import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import AddEventPage, { AddEventForm } from './AddEvent';
import EventList from './EventList';
import EventItem from './EventItem';
import * as ROUTES from '../../constants/routes';

const EventPage = () => (
    <Container>
        <h1>Events</h1>
        <Switch>
            <Route exact path={ROUTES.EVENT_DETAILS} component={EventItem} />
            <Route exact path={ROUTES.EVENT} component={EventList} />
        </Switch>
    </Container>
);

export default EventPage;

export { EventList, EventItem, AddEventForm, AddEventPage };