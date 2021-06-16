import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUp = (e) => {
        e.preventDefault();
        this.props.handleSignUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    }

    render() {
        return (
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>First name</Form.Label>
                                <Form.Control name='firstName' value={this.state.firstName} onChange={(e) => this.handleChange(e)} type="text" placeholder="Enter firstName" />
                                <Form.Text className="text-muted">
                                    We'll never share your firstName with anyone else.
                            </Form.Text>

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control name='lastName' value={this.state.lastName} onChange={(e) => this.handleChange(e)} type="text" placeholder="Enter lastName" />
                                <Form.Text className="text-muted">
                                    We'll never share your lastName with anyone else.
                            </Form.Text>
                            
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name='email' value={this.state.email} onChange={(e) => this.handleChange(e)} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' value={this.state.password} onChange={(e) => this.handleChange(e)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button onClick={this.signUp.bind(this)} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

}

export default SignUp;