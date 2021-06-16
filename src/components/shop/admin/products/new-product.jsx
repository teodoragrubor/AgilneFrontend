import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import http from '../../../../utils/config/http';
import history from '../../../../utils/config/history';

import firebase from '../../../../firebase'

class NewProduct extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        
        /*http
            .post('http://localhost:8085/api/products', {
                ...this.state
            })
            .then(response => {
                console.log(response)
                history.push('/home/admin/products')
            })
            .catch(error => {
                console.log(error)
            })*/
            const firestore = firebase.database().ref('/products');
            const id = '_' + Math.random().toString(36).substr(2, 9);
            const data = this.state;
            data.id = id;
            firestore.push(this.state);
            history.push('/home/admin/products');
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))
    }

    render() {
        return (
            <div className="container">

                <div className='row justify-content-center'>
                    <div className="col-md-6">
                        <h1>Create New Product</h1>
                        <Form>
                            <Form.Group as={Row} controlId="model">
                                <Form.Label column sm="2">
                                    Model:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control name='model' onChange={this.handleChange} type="text" placeholder="Model" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="length">
                                <Form.Label column sm="2">
                                    Length:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control name='length' onChange={this.handleChange} type="text" placeholder="Length" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="category">
                                <Form.Label column sm="2">
                                    Category:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control name='category' onChange={this.handleChange} type="text" placeholder="Category" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm="2">
                                    Price:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control name='price' onChange={this.handleChange} type="number" placeholder="Price" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="imgUrl">
                                <Form.Label column sm="2">
                                    Image URL:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control name='imgUrl' onChange={this.handleChange} type="text" placeholder="Image URL" />
                                </Col>
                            </Form.Group>
                            <Button type='submit' onClick={(e) => this.handleSubmit(e)}>
                                Submit
                        </Button>
                        </Form>
                    </div>
                </div >
            </div>

        )
    }

}

export default NewProduct;