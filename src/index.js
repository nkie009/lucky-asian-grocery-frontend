import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import axios from 'axios'

const jwt =  localStorage.getItem("jwt");
if (jwt){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
}

ReactDOM.render(
    <Home />,
  document.getElementById('root')
);

