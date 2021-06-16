import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import http from '../../../utils/config/http';
import history from '../../../utils/config/history';


class Cart extends React.Component {

    handlePurchase() {
        http
            .post('http://localhost:8085/api/orders', { userId: this.props.user.id, productID: this.props.cart.map(cart => cart.id) })
            .then(response => {
                console.log(response)
                history.push('/home/products');
                this.props.reset();
            })
            .catch(error => {
                console.log(error)
            })
    }

    sumPrice = () => {
        let sum = 0;
        for (let i = 0; i < this.props.cart.length; i++) {
            
            sum += parseInt(this.props.cart[i].price);
        }
        return sum;
    }


    render() {
        return (
            <div>
                My Cart
            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th width="10px">Image</th>
                            <th>Model</th>
                            <th>Length</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(product => {
                            console.log('product:')
                            console.log(product)
                            return (
                                <tr key={product.id}>
                                    <td><img width='50px' height='50px' src={product.imgUrl} /></td>
                                    <td>{product.model}</td>
                                    <td>{product.length}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button onClick={() => this.props.remove(product)}>🗑</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Sum</td>
                            <td>RSD {this.sumPrice()}</td>
                            <td>
                                <Button onClick={() => this.handlePurchase()}>Purchase</Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }

}

export default Cart;