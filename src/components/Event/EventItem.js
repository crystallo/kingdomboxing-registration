import React, { Component } from 'react';
import { compose } from 'recompose';


import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import RegistryList from '../Registry';
import * as ROLES from '../../constants/roles';

class EventItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            event: null,
            ...props.location.state
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        console.log(this.props.match.params.id);

        this.unsubscribe = this.props.firebase
            .event(this.props.match.params.id)
            .onSnapshot(snapshot => {
                this.setState({
                    event: snapshot.data(),
                    loading: false
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    render() {
        const { event, loading } = this.state;

        return (
            <Container>
                <RegistryList eventid={this.props.match.params.id}/>
            </Container>
        );
    }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition),
    withFirebase
)(EventItem);