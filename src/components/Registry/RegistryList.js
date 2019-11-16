import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import { withFirebase } from '../Firebase';

class RegistryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            empty: true,
            registries: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        var query = this.props.firebase.registries()
            .where("eventid", "==", this.props.eventid);

        query.get().then(results => {
            if (results.empty) {
                this.state.empty = true;
                console.log("No documents found");
            } else {
                this.state.empty = false;
                let registries = [];

                results.forEach(doc => {
                    registries.push({ ...doc.data(), uid: doc.id });
                })

                this.setState({ registries });
            }
            this.setState({ loading: false });
        })
    }

    render() {
        const { registries, loading, empty } = this.state;

        return (
            <Container>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Fights</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading &&
                            <tr><td colspan="4" align="center">
                                    <Spinner animation="border" variant="secondary" />
                                </td></tr>}
                        {!loading && empty && 
                            <tr><td colspan="4" align="center">No item. </td></tr>}
                        {registries.map(registry => (
                            <tr>
                                <td>{registry.first} {registry.last}</td>
                                <td>{registry.height}</td>
                                <td>{registry.weight}</td>
                                <td>{registry.fights}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default withFirebase(RegistryList);