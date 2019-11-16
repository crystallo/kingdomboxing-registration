import React, { Component } from 'react';
import { compose } from 'recompose';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { withFirebase } from '../Firebase';

const AddEventPage = () => (
    <Container>
        <h1> Add Event </h1>
        <AddEventForm />
    </Container>
);

const INITIAL_STATE = {
    name: '',
    date: Date.now(),
    description: '',
    error: null
};

class AddEventFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { name, date, description, error } = this.state;

        this.props.firebase.events().add({
            name: name,
            date: date,
            dateObject: new Date(date).getTime(),
            description: description,
            createAt: this.props.firebase.fieldValue.serverTimestamp()
        })
        .then(() => {
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState({ error });
        })

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { name, date, description, error } = this.state;

        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control 
                            required
                            type="text" 
                            maxLength="250"
                            name="name"
                            value={name}
                            onChange={this.onChange}
                            placeholder="Event Name" 
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            required
                            type="date"
                            name="date"
                            value={date}
                            onChange={this.onChange} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Description (Optional)</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows="3"
                            name="description"
                            value={description}
                            onChange={this.onChange}
                            placeholder="Description" />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" variant="primary mr-2">Submit</Button> 
                        <Button type="reset" variant="outline-secondary" >Clear</Button>
                    </Form.Group>
                </Form>

                {error && <p>{error.message}</p>}
            </Container>
        );
    }
}

const AddEventForm = compose(
    withFirebase
) (AddEventFormBase);

export default AddEventPage;

export { AddEventForm };