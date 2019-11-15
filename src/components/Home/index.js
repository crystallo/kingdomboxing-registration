import React from 'react';
import { AddEventForm } from '../Event'; 

const HomePage = () => (
    <div>
        <h1> Home </h1>
        <p>The Home Page is accessible by everyone.</p>
        <AddEventForm />
    </div>
);

const condition = authUser => !!authUser;

export default HomePage;