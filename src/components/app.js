import React, {useState, useEffect} from 'react';
import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
import UsersContainer from './users/users-container';
import Home from './home/home';
import '../style/_base.scss'
import Shop from './shop/shop';

import Login from './Login';
import Hero from './Hero';

import firebase from 'firebase';

import 'react-app-polyfill/stable';

const App = () => {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState ("");
    const [passwordError, setPasswordError] = useState ("");
    const [hasAccount, setHasAccount] =useState (false);

    const clearInputs = () => {
        setEmail ('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err)=> {
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        });
    };
    const handleSignUp = () => {
        clearErrors();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err)=> {
            switch (err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        });
    };

    const handleLogout = () => {
        firebase.auth().signOut();
    };

    const authListener = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect (() => {
        authListener();
    }, []);

    return (
        <div>
            <Switch>
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/home" render={() => <Shop />} />
                <Redirect to="/home" />
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignUp={handleSignUp}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}    
                />
                <Hero handleLogout={handleLogout}/>
            </Switch>
        </div>
    );

}

export default withRouter(App);