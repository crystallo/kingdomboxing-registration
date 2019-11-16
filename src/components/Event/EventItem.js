import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import { withFirebase } from '../Firebase';
import RegistryList from '../Registry';

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
        /*if (this.state.event) {
            return;
        }*/

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

export default withFirebase(EventItem);