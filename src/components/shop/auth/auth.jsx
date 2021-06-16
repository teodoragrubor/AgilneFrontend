import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './sign-in';
import SignUp from './sign-up';
import http from '../../../utils/config/http';
import history from '../../../utils/config/history';

class Auth extends React.Component {

    handleSignIn(email, password) {
        http
            .post('http://localhost:8085/api/users/sign-in', { email, password })
            .then(response => {
                console.log(response);
                this.props.setUser(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSignUp(firstName, lastName, email, password) {
        http
            .post('http://localhost:8085/api/users/sign-up', { firstName, lastName, email, password })
            .then(response => {
                console.log(response)
                history.push('/home/auth/sign-in')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                
                <Switch>
                    <Route path='/home/auth/sign-in' render={() => <SignIn handleSignIn={(email, password) => this.handleSignIn(email, password)} />} />
                    <Route path='/home/auth/sign-up' render={() => <SignUp handleSignUp={(firstName, lastName, email, password) => this.handleSignUp(firstName, lastName, email, password)} />} />
                </Switch>
            </div>
        )
    }

}

export default Auth;