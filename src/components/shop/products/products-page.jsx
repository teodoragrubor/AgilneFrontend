import React from 'react';
import http from '../../../utils/config/http';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';

import firebase from '../../../firebase'


class ProductsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
        this.fetchProducts();
    }

    componentDidMount() {
        //this.fetchProducts();
        console.log('ovdee')
        console.log(this.state.data)
        /*console.log('teodora')
        http
            .get('http://localhost:8085/api/products')
            .then(response => {
                this.setState({
                    data: response.data
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })*/
    }

    fetchProducts(){
        firebase.database().ref('products').once("value", snapshot => {
            if (snapshot && snapshot.exists()) {
                snapshot.forEach(element => {
                        this.setState({
                            data: [...this.state.data, element.val()]
                        });
                });
            }});
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {data.map(product => {
                            return (
                                <div key={product.id} >
                                    {console.log(product)}
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={product.imgUrl} />
                                        <Card.Body>
                                            <Card.Title>{product.model}</Card.Title>
                                            <Card.Text>
                                                {product.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup >
                                            <ListGroupItem>Length: {product.length}</ListGroupItem>
                                            <ListGroupItem>Category: {product.category}</ListGroupItem>
                                            <ListGroupItem>Price: {product.price} RSD</ListGroupItem>
                                        </ListGroup>
                                        <Card.Body >
                                            {this.props.user.role.id === 2 ? <Card.Link onClick={() => this.props.addProduct(product)} href="#">ADD TO CART</Card.Link> : null}
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductsPage;