import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import HomePage from "./home/home-page";
import ProductsPage from "./products/products-page";
import Admin from "./admin/admin";
import history from "../../utils/config/history";
import Auth from "./auth/auth";
import Cart from "./cart/cart";


class Shop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                role: {
                    id: 0
                }
            },
            cart: [],
            sum: 0
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user') == null) {
            console.log('nema')
        } else {
            console.log('ima')
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            })
        }
    }

    setUser(user) {
        this.setState({
            user
        })
        localStorage.setItem('user', JSON.stringify(user));
        history.push('/home')
    }

    resetCart() {
        this.setState({
            cart: [],
            sum: 0
        })
    }

    handleAddProduct(product) {
        this.setState({
            cart: [...this.state.cart, product]
        }, () => {
            let sum = 0;
            this.state.cart.forEach(c => {
                sum += c.price;
            });

            this.setState({
                sum : sum
            })
        })


    }

    handleRemoveProduct(product) {
        let newArr = [];
        for(let j of this.state.cart) {
            if(j.id !== product.id) {
                newArr.push(product)
            }
        }

        this.setState({
            cart: newArr
        }, () => {
            let sum = 0;
            this.state.cart.forEach(c => {
                sum += c.price;
            });

            this.setState({
                sum
            })
        })
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand onClick={() => history.push("/home")}>Teodora's Lashes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Nav.Link onClick={() => history.push("/home")}>Početna</Nav.Link>
                            <Nav.Link onClick={() => history.push("/home/products")}>Proizvodi</Nav.Link>
                            <NavDropdown title="Vaš profil" id="collasible-nav-dropdown">
                                {this.state.user.role.id === 1 ? <NavDropdown.Item onClick={() => { console.log('logd'); history.push("/home/admin") }} >Admin Panel</NavDropdown.Item> : null}
                                {this.state.user.role.id === 2 ? <NavDropdown.Item onClick={() => { console.log('logd'); history.push("/home/cart") }} >Korpa</NavDropdown.Item> : null}
                                {this.state.user.role.id === 0 ? <NavDropdown.Item onClick={() => { history.push("/home/auth/sign-in") }} >Sign in</NavDropdown.Item> : null}
                                {this.state.user.role.id === 0 ? <NavDropdown.Item onClick={() => { history.push("/home/auth/sign-up") }} >Sign up</NavDropdown.Item> : null}
                                {this.state.user.role.id > 0 ? <NavDropdown.Item onClick={() => { history.push('/home/auth/sign-in'); localStorage.clear(); this.setState({ user: { ...this.state.user, role: { id: 0 } } }) }} >LogOut</NavDropdown.Item> : null}
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path='/home/auth' render={() => <Auth setUser={(user) => this.setUser(user)} />} />
                    <Route path='/home/cart' render={() => <Cart sum={this.state.sum} remove={(product) => this.handleRemoveProduct(product)} reset={() => this.resetCart()} user={this.state.user} cart={this.state.cart} />} />
                    <Route path='/home/products' render={() => <ProductsPage addProduct={(product) => this.handleAddProduct(product)} user={this.state.user} />} />
                    <Route path='/home/admin' render={() => <Admin />} />
                    <Route path='/home' render={() => <HomePage />} />
                    <Redirect to='/home' />
                </Switch>
            </div>
        )
    }
}

export default Shop

