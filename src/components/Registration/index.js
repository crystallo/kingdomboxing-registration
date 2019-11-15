import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'reacompose';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const RegistrationPage = () => (
    <div>
        <h1>Register </h1>
    </div>
);

const INITIAL_STATE = {
    first: '',
    last: '',
    email: '',
    height: '',
    weight: '',
    fights: '',
    event: '',
    error: null
};

class RegistrationFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { first, last, email, height, weight, fights, event  } = this.state;

        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    
                </Form>
            </Container>
        )

    }
}