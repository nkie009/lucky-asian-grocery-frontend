import React from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Cart from './Cart'
import NavBar from './Navbar';
import Checkout from './Checkout';
import './Cart.css'

const BASE_ORDER_URL = "http://localhost:3000/api/order/"
class Order extends React.Component {


    // componentDidMount(){
    //     this.fetchCart()
    // }

    // fetchCart = async () => {

    // try {
    //     const res = await axios.get(BASE_ORDER_URL)
    //     console.log('Check this Response', res.data)
    // } catch (err) {
    //     console.log('Error with AJAX', err)

    // }
    // }

    state = {
        address: '',
        payment: '',
        error: '',
        loading: '',
        order: {}

    };

    

    handleInputAddress = (ev) => {
        // console.log('input', ev.target.value);
        this.setState({ address: ev.target.value })
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log('submit address', this.state);
        // this.fetchCart();
        //axios request to backend
        try{
            const orderRes = await axios.post(`http://localhost:3000/orders`, this.state)
            console.log('Order Create Response FOR ADDRESS', orderRes.data)
            this.setState({order: orderRes.data});
          }catch(err){
            console.log('Error Creating Order', err)
          }

    } //handleSubmit()

    handleCreditCard = async (ev) => {
        ev.preventDefault();
        console.log('submit credit card', this.state);
        try{
            const orderRes = await axios.patch(`http://localhost:3000/orders/${this.state.order.id}`)
            console.log('Order Create Response FOR CREDIT CARD', orderRes.data)
            this.props.history.push('/checkout')
            // this.setState({order: orderRes.data});
          }catch(err){
            console.log('Error Creating Order', err)
          }

    } //handleSubmit()

    render() {


        return (

            <div className='formField'>
            
            <Cart hideEditControls={true} /> 
                <h4 className='orderName'>Order Details:</h4>
                {
                    this.state.order.id
                    ?
                    <form onSubmit={this.handleCreditCard}>
                        <strong>Credit Card Details</strong>
                        <br/>
                        <input className='orderTextfield' type="text" placeholder="Credit Card Details" onChange={this.handleCreditCardDetails}/>
                        <br/>
                        <strong>Expiry Date</strong>
                        <br/>
                        <input className='orderTextfield' type="text" placeholder="Expiry Date" onChange={this.handleExpiryDate}/>
                        <br/>

                        <button className='buttonFinal'>Purchase Asian Goodies</button>
                
                    </form>   
                    :
                    
                    <form onSubmit={this.handleSubmit}>
                        <strong>Address</strong>
                        <br/>
                        <input className='orderTextfield' type="text" placeholder="address" onChange={this.handleInputAddress} />
                        <br /><br />
                        <button className='buttonFinal'>Finalise Payment</button>
                        <br/>

                    </form>
                }
            

            </div>

        ) //return

    }//render()

}
export default Order