import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import { withFirebase } from '../Firebase';

const columns = [{
        dataField: 'name',
        text: 'Name',
        sort: true
    }, {
        dataField: 'age',
        text: 'Age',
        sort: true
    }, {
        dataField: 'weight',
        text: 'Weight',
        sort: false
    }, {
        dataField: 'bouts',
        text: 'Bouts',
    }, {
        dataField: 'coach',
        text: 'Coach',
    }, {
        dataField: 'gym',
        text:' Gym',
    }, {
        dataField: 'email',
        text: 'Email'
    }, {
        dataField: 'contact',
        text: 'Phone'
    }];

class RegistryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: null,
            loading: false,
            empty: true,
            registries: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.createEventTable();

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
                    let data = doc.data();
                    let age =  parseInt(this.state.event.date.substring(0,4)) - parseInt(data.birthday.substring(0,4));
                    let name = data.first + " " + data.last;

                    registries.push({ ...doc.data(), 
                                        age: age,
                                        name: name,
                                        uid: doc.id });
                })

                this.setState({ registries });
            }
            this.setState({ loading: false });
        })
    }

    createEventTable() {
        console.log("get event: ", this.props.eventid);
        
        this.props.firebase.events().doc(this.props.eventid)
            .get()
            .then(doc => {
                if (doc.exists)
                    this.setState({ event : doc.data() });
            })
            .catch( error => {
                console.log("Event doesn't exists.");
            });
    }

    render() {
        const { registries, loading, empty } = this.state;

        return (
            <Container>
                <BootstrapTable 
                    containerStyle={{width: '200%',overflowX: 'scroll'}} 
                    keyField='id' 
                    data={ registries } 
                    columns={ columns } />
            </Container>
        )
    }
}

export default withFirebase(RegistryList);