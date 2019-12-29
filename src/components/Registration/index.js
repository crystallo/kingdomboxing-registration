import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    gym: '',
    coach: '',
    contact: '',
    email: '',
    fighters: [{usaboxingnumber: '',
                first: '',
                last: '',
                weight: '',
                bouts: '',
                sex: '',
                birthday: '',
                phone: ''}],
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
        this.updateEventID();
    }

    onSubmit = event => {
        const {
            gym,
            coach,
            contact,
            email,
            fighters,
            eventid,
            error
        } = this.state;

        console.log(eventid);
        let duplicated_fighters = [];

        for (let fighter of fighters) {
            // Check for duplicate fighter
            var query = this.props.firebase.registries()
                .where("eventid", "==", eventid)
                .where("usaboxingnumber", "==", fighter.usaboxingnumber);
            
            query.get().then(results => {
                if (results.empty) {
                    this.props.firebase.registries().add({
                        eventid: eventid,
                        gym: gym,
                        coach: coach,
                        contact: contact,
                        email: email,
                        usaboxingnumber: fighter.usaboxingnumber,
                        first: fighter.first,
                        last: fighter.last,
                        sex: fighter.sex,
                        phone: fighter.phone,
                        birthday: fighter.birthday,
                        weight: fighter.weight,
                        bouts: fighter.bouts
                    })
                    .catch(error => {
                        this.setState({ error });
                    })
                } else {
                    console.log("areadly exist", results);
                    duplicated_fighters.concat(fighter);
                }
            });
        }

        if (!error) 
            this.resetForm();

        event.preventDefault();
    }

    onChange = (event) => {
        if(["usaboxingnumber", 
            "first", 
            "last", 
            "weight", 
            "bouts", 
            "sex", 
            "birthday", 
            "phone"].includes(event.target.name)) {
            let fighters = [...this.state.fighters];
            fighters[event.target.dataset.id][event.target.name] = event.target.value;
            this.setState({ fighters });
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    addFighter = () => {
        this.setState({
            fighters: this.state.fighters.concat([{
                usaboxingnumber: '',
                first: '',
                last: '',
                weight: '',
                bouts: '',
                sex: '',
                birthday: '',
                phone: ''
            }])
        });
    }

    removeFighter = idx => () => {
        this.setState({
            fighters: this.state.fighters.filter((f, fidx) => fidx !== idx)
        });
    }

    updateEventID = () => {
        var query = this.props.firebase.events()
            .orderBy("dateObject", "desc")
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

                this.setState({ events });
                this.setState({eventid: events[0].uid });
            };
        });
    }

    resetForm = () => {
        this.setState({ ...INITIAL_STATE, 
            fighters: [
                {usaboxingnumber: '',
                first: '',
                last: '',
                weight: '',
                bouts: '',
                sex: '',
                birthday: '',
                phone: ''}
            ] });

        this.updateEventID();
    }

    render() {
        const { gym, coach, email, events, contact,
            eventid, error, fighters } = this.state;

        return (
            <Container>
                <Form onSubmit={this.onSubmit} onChange={this.onChange} method="post">
                    <Form.Group controlId="formGridEventid">
                        <Form.Label>Event</Form.Label>
                        <Form.Control 
                            as="select"
                            name="eventid"
                            value={eventid}>
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
                            placeholder="Enter email" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlID="formGridFirst">
                            <Form.Label>Gym</Form.Label>
                            <Form.Control 
                                name="gym"
                                value={gym}
                                type="text" 
                                placeholder="Enter gym name" />
                        </Form.Group>
                        <Form.Group as={Col} controlID="formGridLast">
                            <Form.Label>Coach</Form.Label>
                            <Form.Control 
                                name="coach"
                                value={coach}
                                type="text" 
                                placeholder="Enter coach name" />
                        </Form.Group>
                        <Form.Group as={Col} controlID="formGridLast">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control 
                                name="contact"
                                value={contact}
                                type="contact" 
                                placeholder="Enter phone number" />
                        </Form.Group>
                    </Form.Row>
                        {fighters.map((fighter, idx) => {
                            return (
                                <p>
                                    <Form.Row>
                                        <h3>Fighter {idx+1} </h3>
                                        {idx > 0 && <p>
                                            <Button 
                                                size="sm"
                                                type="button" 
                                                variant="danger"
                                                onClick={this.removeFighter(idx)}>
                                                X
                                            </Button>
                                        </p>}
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>USA Boxing #</Form.Label>
                                            <Form.Control 
                                                type="number"
                                                name="usaboxingnumber"
                                                value={fighter.usaboxingnumber}
                                                data-id={idx} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>First</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="first"
                                                value={fighter.first}
                                                data-id={idx} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Last</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="last"
                                                value={fighter.last}
                                                data-id={idx} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Sex</Form.Label>
                                            <Form.Control 
                                                as="select"
                                                name="sex"
                                                value={fighter.sex}
                                                data-id={idx}>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control 
                                                type="tel"
                                                name="phone"
                                                value={fighter.phone}
                                                data-id={idx} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Birthday</Form.Label>
                                            <Form.Control 
                                                type="date"
                                                name="birthday"
                                                value={fighter.birthday}
                                                data-id={idx} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Weight</Form.Label>
                                            <Form.Control 
                                                width="33%"
                                                name="weight"
                                                value={fighter.weight}
                                                data-id={idx} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Number of Bouts</Form.Label>
                                            <Form.Control 
                                                width="33%"
                                                type="number"
                                                name="bouts"
                                                value={fighter.bouts}
                                                data-id={idx} />
                                        </Form.Group>
                                    </Form.Row>
                                </p>
                            )
                        })
                    }

                    <Form.Group>
                        <Button variant="outline-primary" type="button"
                            onClick={this.addFighter}>
                            Add Another Fighter
                        </Button>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary mr-2" type="submit">
                            Submit
                        </Button>
                        <Button variant="outline-secondary" type="button"
                            onClick={this.resetForm}>
                            Clear
                        </Button>
                    </Form.Group>
                </Form>
                {error && <p><Alert color="warning">{ error.message }</Alert></p>}
            </Container>
        )
    }
}

const RegistrationForm = compose (
    withRouter,
    withFirebase
) (RegistrationFormBase);

export default withFirebase(RegistrationForm);