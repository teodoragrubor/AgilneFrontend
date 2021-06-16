import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import http from '../../../../utils/config/http';

class AllUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        http
            .get('http://localhost:8085/api/users')
            .then(response => {
                this.setState({
                    data: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                All Users
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default AllUsers;