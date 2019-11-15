import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const RegistrationPage = () => (
    <div>
        <h1>Register </h1>
        <RegistrationForm />
    </div>
);

const INITIAL_STATE = {
    first: '',
    last: '',
    email: '',
    height: '',
    weight: 0,
    fights: '',
    eventid: '',
    events: [],
    error: null
};

class RegistrationFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        var query = this.props.firebase.events()
            .where("dateObject", ">", Date.now());

        query.get().then(results => {
            if (results.empty) {
                // TODO: Disable registration since no event is available
                console.log("No documents found");
            } else {
                let events = [];

                results.forEach(doc => {
                    events.push({ ...doc.data(), uid: doc.id });
                })

                this.setState({ events,
                    eventid: events[0].uid });
            };
        })
    }

    onSubmit = event => {
        const {
            first,
            last,
            email,
            height,
            weight,
            fights,
            eventid,
            error
        } = this.state

        console.log(eventid);

        // TODO: Check for duplicate registration
        this.props.firebase.registries().add({
            eventid: eventid,
            first: first,
            last: last,
            email: email,
            height: height,
            weight: weight,
            fights: fights
        })
        .then(() => {
            // TODO: Redirect user 
            // TODO: Send verification email
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState({ error });
        })

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { first, last, email, height, weight, fights, events, eventid, error  } = this.state;

        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formGridEventid">
                        <Form.Label>Event</Form.Label>
                        <Form.Control 
                            as="select"
                            name="eventid"
                            value={eventid}
                            onChange={this.onChange} >
                            {events.map(event => (
                                <option value={event.uid} key={event.uid}>{event.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            name="email"
                            value={email}
                            type="email" 
                            onChange={this.onChange}
                            placeholder="Enter email" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlID="formGridFirst">
                            <Form.Label>First</Form.Label>
                            <Form.Control 
                                name="first"
                                value={first}
                                type="first" 
                                onChange={this.onChange}
                                placeholder="Enter first name" />
                        </Form.Group>
                        <Form.Group as={Col} controlID="formGridLast">
                            <Form.Label>Last</Form.Label>
                            <Form.Control 
                                name="last"
                                value={last}
                                type="last" 
                                onChange={this.onChange}
                                placeholder="Enter last name" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlID="formGridWeight">
                            <Form.Label>Weight (lbs)</Form.Label>
                            <Form.Control 
                                name="weight"
                                value={weight}
                                type="number" 
                                onChange={this.onChange}
                                placeholder="Enter weight" />
                        </Form.Group>
                        <Form.Group as={Col} controlID="formGridHeight">
                            <Form.Label>Height</Form.Label>
                            <Form.Control 
                                name="height"
                                value={height}
                                type="height" 
                                onChange={this.onChange}
                                placeholder="Enter height" />
                        </Form.Group>
                        <Form.Group as={Col} controlID="formGridFights">
                            <Form.Label>Fights</Form.Label>
                            <Form.Control 
                                name="fights"
                                value={fights}
                                type="number" 
                                onChange={this.onChange}
                                placeholder="Enter number of fights" />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary mr-2" type="submit">
                        Submit
                    </Button>
                    <Button variant="outline-secondary" type="reset">
                        Clear
                    </Button>
                </Form>
                {error && <div><Alert color="warning">{ error.message }</Alert></div>}
            </Container>
        )
    }
}

const RegistrationForm = compose (
    withRouter,
    withFirebase
) (RegistrationFormBase);

export default withFirebase(RegistrationForm);