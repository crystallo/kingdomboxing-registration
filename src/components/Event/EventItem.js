import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

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
        if (this.state.event) {
            return;
        }

        this.setState({ loading: true });

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
            <div></div>
        );
    }
}