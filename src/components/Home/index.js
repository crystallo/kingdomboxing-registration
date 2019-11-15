import React from 'react';
import { AddEventForm, EventList } from '../Event'; 

const HomePage = () => (
    <div>
        <h1> Home </h1>
        <p>The Home Page is accessible by everyone.</p>
        <AddEventForm />
        <EventList />
    </div>
);

const condition = authUser => !!authUser;

export default HomePage;