import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        this.props.firebase
            .doPasswordUpdate(this.state.passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalud = passwordOne === '' || passwordOne !== passwordTwo;

        return(
            <form onSubmit={this.onSubmit}>
                <input
                    name="passwordOne"
                    value={this.state.passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Enter Password"
                />
                <input
                    name="passwordTwo"
                    value={this.state.passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalud} type="submit">
                    Change Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
};

export default withFirebase(PasswordChangeForm);