import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import { AddEventForm, EventList } from '../Event'; 
import { withFirebase } from '../Firebase';
import RegistrationForm from '../Registration';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: [],
            error: null
        };
    }

    componentDidMount() {
        // Get the latest event
        this.props.firebase.events()
            .orderBy("date", "desc")
            .limit(1)
            .get()
            .then(results => {
                let event = { ...results.docs[0].data(), uid: results.docs[0].uid };
                this.setState({ event });
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    render() {
        const { event } = this.state;

        return (
            <Jumbotron>
                <h1>{event.name} name</h1>
                <p>Event poster / description</p>
                <p>
                    <h2>Register Now!</h2>
                </p>
                <p>
                    <RegistrationForm eventid={event.uid} />
                </p>
            </Jumbotron>
        );
    }
    
}

export default withFirebase(HomePage);