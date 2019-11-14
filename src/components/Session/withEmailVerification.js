import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password');

const withEmailVerification = Component => {
    class withEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isSent: false };
        }

        onSendEmailVerification = () => {
            console.log("Email ver");
            this.props.firebase
                .doSendEmailVerification()
                .then(() => this.setState({ isSent: true }));
        };
        
        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => 
                        needsEmailVerification(authUser) ? (
                            <div>
                                <p>
                                    
                                    {this.state.isSent ? (
                                        <p> Confirmation email sent. Please check your email.
                                        Refresh this page once you confirmed your email.
                                        </p>
                                    ) : (
                                        <p>
                                        Verify your email.
                                        </p>
                                    )}
                                    
                                </p>
                                <button type="button" disabled={this.state.isSent} 
                                    onClick={this.onSendEmailVerification}>
                                    Send confirmation email
                                </button>
                            </div>

                            
                        ) : (
                        <Component {...this.props} />
                        )
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return withFirebase(withEmailVerification);
;}



export default withEmailVerification;