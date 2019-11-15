import React, { Component } from 'react';
import { compose } from 'recompose';


import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.unsubscribe = this.props.firebase.users()
            .onSnapshot(snapshot => {
                let users = [];

                snapshot.forEach(doc =>
                    users.push({ ...doc.data(), uid: doc.id })
                );

                this.setState({
                    users,
                    loading: false
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { users, loading } = this.state;
        const numUsers = users.length

        console.log(users);

        return (
            <div>
                <h1>Admin</h1>
                <p> The Admin Page is accessible by every signed in admin user. </p>

                {loading && <div>Loading ...</div>}

                <UserList users={users} />
            </div>
        );
    }
}

const UserList = ({ users }) => (
    <u1>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    {user.uid}
                </span>
                <span>
                    {user.email}
                </span>
                <span>
                    {user.username}
                </span>
            </li>
        ))}
    </u1>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(AdminPage);