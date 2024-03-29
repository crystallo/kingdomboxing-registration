import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor () {
        app.initializeApp(config);

        this.emailAuthProvider = app.auth.EmailAuthProvider;
        this.fieldValue = app.firestore.FieldValue;

        this.auth = app.auth();
        this.db = app.firestore();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    // Auth API
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification();
    
    // Merge Auth and DB User API
    onAuthUserListener = (next, fallback) => 
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .get()
                    .then(snapshot => {
                        const dbUser = snapshot.data();

                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // User API
    user = uid => this.db.doc(`users/${uid}`);

    users = () => this.db.collection(`users`);

    // Event API
    event = uid => this.db.doc(`events/${uid}`);

    events = () => this.db.collection(`events`);

    // Registry API
    registry = uid => this.db.doc(`registries/${uid}`);

    registries = () => this.db.collection(`registries`);
}

export default Firebase;