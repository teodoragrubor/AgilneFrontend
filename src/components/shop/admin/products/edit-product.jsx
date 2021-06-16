import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import http from '../../../../utils/config/http';
import { withRouter } from 'react-router-dom';
import history from '../../../../utils/config/history';

import firebase from '../../../../firebase'

class EditProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product: {}
        }
        //this.fetchProduct();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.fetchProduct()
        /*http
            .get('http://localhost:8085/api/products/' + id)
            .then(response => {
                console.log(response)
                this.setState({
                    product: response.data
                },() => console.log(this.state))
            })
            .catch(error => {
                console.log(error)
            })*/
            /*firebase.database().ref('products').orderByChild('id').equalTo(id).once('value',function(snapshot){
                if (snapshot && snapshot.exists()) {
                    snapshot.forEach(element => {
                            this.setState({
                                product: element.val()
                            });
                    });
                }
            });
            console.log('ovde');
            console.log(id);*/
    }

    fetchProduct = () => {
        const { id } = this.props.match.params;
        firebase.database().ref('products').orderByChild('id').equalTo(id).on('value',snapshot =>{
            if (snapshot && snapshot.exists()) {
                snapshot.forEach(element => {
                    this.setState({
                        product: element.val()
                    })
                        console.log('proveri ovde');
                        console.log(element.val());
                });
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        const { id } = this.props.match.params;
        /*http
            .put('http://localhost:8085/api/products', {
                ...this.state.product
            })
            .then(response => {
                console.log(response)
                history.push('/home/admin/products')
            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
            })*/
            var productToEdit = this.state.product;
            var referenceToEdit = firebase.database().ref('products').orderByChild('id').equalTo(id);
            referenceToEdit.once('value',snapshot =>{
                    snapshot.forEach(function(child) {
                        child.ref.child('model').set(productToEdit.model);
                        child.ref.child('length').set(productToEdit.length);
                        child.ref.child('category').set(productToEdit.category);
                        child.ref.child('price').set(productToEdit.price);
                        child.ref.child('imgUrl').set(productToEdit.imgUrl);

                        //child.ref.child('description').set(data.description);
                });
            });
            history.push('/home/admin/products');
    }

    handleChange = e => {
        this.setState({
            product: {
                ...this.state.product,
                [e.target.name]: e.target.value
            }
        }, () => console.log(this.state))
    }

    render() {
        return (
            <div className="container">

                <div className='row justify-content-center'>
                    <div className="col-md-6">
                        <h1>Edit this Product</h1>
                        <Form>
                            <Form.Group as={Row} controlId="model">
                                <Form.Label column sm="2">
                                    Model:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.state.product.model} name='model' onChange={this.handleChange} type="text" placeholder="Model" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="length">
                                <Form.Label column sm="2">
                                    Length:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.state.product.length} name='length' onChange={this.handleChange} type="text" placeholder="Length" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="category">
                                <Form.Label column sm="2">
                                    Category:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.state.product.category} name='category' onChange={this.handleChange} type="text" placeholder="Category" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm="2">
                                    Price:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.state.product.price} name='price' onChange={this.handleChange} type="number" placeholder="Price" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="imgUrl">
                                <Form.Label column sm="2">
                                    Image URL:
                         </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.state.product.imgUrl} name='imgUrl' onChange={this.handleChange} type="text" placeholder="Image URL" />
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

export default withRouter( EditProduct);