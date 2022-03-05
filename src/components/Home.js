import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import NavBar from './Navbar';
import Products from './Products';
import Categories from './Categories'
import Login from './Login'
import axios from 'axios';
import MyProfile from './MyProfile'
import ProductShow from './ProductShow';
import Cart from './Cart';
import Order from './Order';
import Checkout from './Checkout'

const BASE_URL = "https://floating-eyrie-21279.herokuapp.com/";

class Home extends React.Component {

  //App state
  state = {
    currentUser: {},
  };

  //function to run on component mounting
  componentDidMount() {
    this.setCurrentUser();
  }

  //function to set the state to the current logged in user
  setCurrentUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios
      .get(`${BASE_URL}/users/current`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ currentUser: res.data });
      })
      .catch((err) => console.warn(err));
  };

  //function to log the user out.
  handleLogout = () => {
    this.setState({ currentUser: undefined });
    localStorage.removeItem("jwt");
    axios.defaults.headers.common["Authorization"] = undefined;
  };

  render() {
    return (
      <div>
        <Router>
          <nav id="navbar">
            <div className="nav-wrapper ">
              {/* Show one of two nav bars depending on if the user is logged in */}
                {
                  this.state.currentUser
                  ?
                  (
                    <ul>
                      <li>Welcome {this.state.currentUser.name} | </li>
                      <li><Link to='/my_profile'>My Profile</Link></li>
                      <li><Link to='/products'>All Products</Link></li>
                      <li><Link to='/cart'>Cart</Link></li>
                      <li><Link onClick={this.handleLogout} to='/'>Logout</Link></li>
                    </ul>
                  )
                  :
                  (
                    <ul>
                      <li><Link to='/login'>Login</Link></li>
                    </ul>
                  )
                }
                </div>
            </nav>
          <Route path="/"  component={NavBar} />
          {/* <Route path="/login"  component={Login} /> */}

          <Route exact path="/products" component={Products}/>
          <Route exact path="/categories" component={Categories}/>
          <Route exact path='/my_profile' component={MyProfile}/>
          <Route exact path="/products/:id"  component={ProductShow} />
          <Route exact path="/cart"  component={Cart} />
          <Route exact path="/orders"  component={Order} />
          <Route exact path="/checkout"  component={Checkout} />


          {/* <Route exact path="/cart/add/:product_id"  component={Cart} /> */}

          <Route
            exact
            path="/login"
            render={(props) => (
              <Login setCurrentUser={this.setCurrentUser} {...props} />
            )}
          />
        </Router>

        <footer>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

        </footer>
      </div>
    );
  }
}

export default Home;
