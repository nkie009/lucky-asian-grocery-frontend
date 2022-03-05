import React from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

const BASE_CHECKOUT_URL = "http://localhost:3000/orders/"

class Checkout extends React.Component{


    // state = {
    //     creditCardDetails: '',
    //     expiryDate: '',
    //     creditCardValid: false,
    //     expiryDateValid: false

    // }

    // componentDidMount(){
        
    //     this.fetchCart();
    //     // console.log("WHAT", this.props.match)
    // }

    // handleCreditCardDetails = (ev) => {
    //     if(ev.target.value.length < 0){ //dummy conditional
    //         window.location.reload(true)
    //     }else{
    //     this.setState({creditCardDetails: ev.target.value})
    //     this.setState({creditCardDetails: true})
    // }}

    // handleExpiryDate = (ev) => {
    //     if(ev.target.value.length < 0){ //dummy conditional
    //         window.location.reload(true)
    //     }else{
    //     this.setState({expiryDate: ev.target.value})
    //     this.setState({expiryDateValid: true})
    // }}
    
    // fetchCart = async () => {
    // // console.log("params". this.props)
    // try {
    //     const res = await axios.get(BASE_CHECKOUT_URL + this.props.match.params.order_line_items_id)
    //     console.log('Check this Response', res.data)
    // } catch (err) {
    //     console.log('Error with AJAX', err)

    // }} //fetchCart()

    // handleSubmit = async(ev) => {
    //     ev.preventDefault();
    //     // this.updateOrderLineItem()
    //     // this.setState({status: paid})
    //     // this.props.history.push(`/order/add/`);


    // }

    // updateOrderLineItem = async () => {
    //     this.setState({loading: true})
    
    //     try{
    //       const updateRes = await axios.post(`http://localhost:3000/api/order/add/`)
    //       //need cart_line_items_id

    //       console.log('update Order Line Item', updateRes.data)
    //     }catch(err){
    //       console.log('Error loading AJAX')
    //     }
    // }

    
    render(){



        return(
        <div className='checkoutTagline'>
            <h1>Thanks for shopping</h1>
           
        </div>
        )



    }






}
export default Checkout