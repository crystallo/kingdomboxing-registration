import React, { Component } from 'react';

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

        this.unsubsrcibe= this.props.firebase
            .events()
            .onSnapShot(snapshot => {
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
        this.unsubsrcibe();
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                {loading && <div>Loading ...</div>}
            </div>
        )
    }
}

export default EventList;