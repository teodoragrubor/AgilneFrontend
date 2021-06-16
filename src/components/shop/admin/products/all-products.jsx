import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import http from '../../../../utils/config/http';
import history from '../../../../utils/config/history';

import firebase from '../../../../firebase'

class AllProducts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
            firebase.database().ref('products').once("value", snapshot => {
                if (snapshot && snapshot.exists()) {
                    snapshot.forEach(element => {
                            this.setState({
                                data: [...this.state.data, element.val()]
                            });
                    });
                }});
    }

    handleDelete(id, position) {
            var referenceToDelete = firebase.database().ref('products').orderByChild('id').equalTo(id);
            referenceToDelete.once('value',function(snapshot){
                    snapshot.forEach(function(child) {
                    console.log(child.ref);
                    child.ref.remove();
                });
            });
            this.setState(prevState => ({
                data : prevState.data.filter((user, i) => {
                    return i !== position;
                })
            }));
    }

    render() {
        return (
            <div>
                All Product
                <Button onClick={() => history.push('/home/admin/products/new')}>
                    CREATE NEW
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th width="10px">Image</th>
                            <th>#</th>
                            <th>Model</th>
                            <th>Length</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Deleted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((product, position) => {
                            return (
                                <tr key={product.id}>
                                    <td><img width='50px' height='50px' src={product.imgUrl} /></td>
                                    <td>{product.id}</td>
                                    <td>{product.model}</td>
                                    <td>{product.length}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.deleted ? "YES" : "NO"}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button onClick={() => this.handleDelete(product.id, position)}>🗑</Button>
                                            <Button onClick={() => history.push('/home/admin/products/edit/' + product.id)}>🖉</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default AllProducts;