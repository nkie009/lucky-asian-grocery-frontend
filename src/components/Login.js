import React from 'react';
import axios from 'axios';
import styles from './Login.css'

const BASE_URL = 'http://localhost:3000'

class Login extends React.Component {
  
  state = {
    email: '',
    password: ''
  }
  
  handleInput = (ev) => {
    switch(ev.target.name){
      
      case 'email':
        this.setState({email: ev.target.value})
        break;
      case 'password':
        this.setState({password: ev.target.value})
    }
  } //handleInput

  handleSubmit = (ev) => {
    //create a request object we can pass through to knock
    const request = {'email': this.state.email, 'password': this.state.password}

    //do an axios post request where we can send through the user details to rails and login
    axios.post(`${BASE_URL}/user_token`, {auth: request})
    .then(result => {
      localStorage.setItem("jwt", result.data.jwt)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.jwt;
      this.props.setCurrentUser();
      this.props.history.push('/products');
    })
    .catch(err => {
      console.warn(err)
    })
    ev.preventDefault();
  }


  render(){
    return(
      <div className='form-box'>
        <form onSubmit={this.handleSubmit}>
          <label className='title'>Login</label>
          <br/>

          <input
            onChange={this.handleInput}
            name="email"
            type="email"
            // value="steven@ga.co"
            placeholder='Enter Email'
            />
          <br/>
          <input
            onChange={this.handleInput}
            name="password"
            type="password"
            // value="chicken"
            placeholder='Enter Password'
            />
          <br/>
          <button>Login</button>
        </form>
      </div>

    ); // return
  }// render
}

export default Login;