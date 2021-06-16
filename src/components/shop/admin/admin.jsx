import React from "react"
import { Switch, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import AllUsers from "./users/all-users";
import history from "../../../utils/config/history";
import AllProducts from "./products/all-products";
import NewProduct from "./products/new-product";
import EditProduct from "./products/edit-product";

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 0
        }
    }

    render() {
        return (
            <div>
                <Nav fill variant="tabs">
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push('/home/admin/users')}>Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push('/home/admin/products')}>Products</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Switch>
                    <Route path='/home/admin/users' render={() => <AllUsers />} />
                    <Route path='/home/admin/products/new' render={() => <NewProduct />} />
                    <Route path='/home/admin/products/edit/:id' render={() => <EditProduct />} />
                    <Route path='/home/admin/products' render={() => <AllProducts />} />
                </Switch>
            </div>
        )
    }

}
export default Admin;