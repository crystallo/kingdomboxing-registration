import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import { withFirebase } from '../Firebase';

class EventList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            events: []
        };
    }

    componentDidMount() {
        this.setState({ lpadomg: true });

        this.unsubscribe= this.props.firebase
            .events()
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
                        </tr>
                        
                    </thead>
                    <tbody>
                        {loading && <tr span="3"><td>Loading ...</td></tr>}
                        {events.map(event => (
                            <tr>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default withFirebase(EventList);