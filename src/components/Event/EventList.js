import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class EventList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            events: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.unsubscribe= this.props.firebase
            .events()
            .orderBy("date", "desc")
            .onSnapshot(snapshot => {
                let events = [];

                snapshot.forEach(doc =>
                    events.push({ ...doc.data(), uid: doc.id })    
                );

                this.setState({
                    events,
                    loading: false
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
      }

    render() {
        const { events, loading } = this.state;

        return (
            <Container>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && 
                            <tr><td colspan="4" align="center">Loading ...</td></tr>}
                        {events.map(event => (
                            <tr>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event.description}</td>
                                <td><Link to={{pathname: `${ROUTES.EVENT}/${event.uid}`}}>Details</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default withFirebase(EventList);