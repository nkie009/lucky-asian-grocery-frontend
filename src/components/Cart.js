import React from 'react';
import axios from 'axios';
import './Cart.css';

const BASE_CART_URL = "https://floating-eyrie-21279.herokuapp.com/api/cart";

class Cart extends React.Component {

  state = {
    cart: [],
    product: [],
    loading: false,
    error: null,
    showAlert: false
  }

  componentDidMount() {
    this.fetchCarts();
  }



  fetchCarts = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(BASE_CART_URL);
      // console.log('CHECK!!Response', res.data)
      this.setState({
        cart: res.data,
        loading: false
      })
    } catch (err) {
      console.log('Error loading AJAX', err)
      this.setState({ error: err, loading: false });
    }
  }

  updateCart = async (item) => {
    this.setState({loading: true})
    // console.log('check this out',  this.state.cart)
    // let cartEmpty = [];
    // this.state.cart.map((item)=>{
    //   cartEmpty.push(item.product_id)
    //   console.log('cartEmpth', cartEmpty)
    //   return cartEmpty
    //   // console.log('inidivudal item', item)
    // })

    try{
      // console.log('thiscart')
      const updateRes = await axios.post(`${BASE_CART_URL}/update_qty/${ item.product_id}`, {qty:item.qty})
      console.log('update cart Let See Response', updateRes.data)
    }catch(err){
      console.log('Error loading AJAX')
    }
  //Post request to update_cart_qty_path qty and product
}


  // matchItem = (lineItemId) =>{
  //   // console.log("LOOK", this.state.product.filter((item)=> item.id === product_id)[0])
  //   return this.state.cart.find((item)=> item.id === lineItemId)
  //   //find instead of filter 
  // } //we Might NOT NEED THIS. this is Jia code

  // handleDelete 

  onClickMinus = (lineItemId) => {
    // const item = this.matchItem(lineItemId)
    // console.log("quantity state", item);
    // //check if lower zero
    // item.qty--;
    //setState replace an array 
    // console.log("minus qty", item);
    //just change qty - map over state 
    this.setState({
      cart: this.state.cart.map(currentItem => {
        //use map to see item ID or other items which we ignore 
        if (currentItem.id === lineItemId && currentItem.qty > 1) {
          //this is the current we update 
          //return new object
          const newItem = { ...currentItem, qty: currentItem.qty - 1}
          this.updateCart(newItem); // this updatese backend but doesnt actually change the state which is done in the next line
          return newItem //the state update
          //save variable then pss that variable intot he update
          //Question: how to put in post request if return function is here
          //updated:true if we were smart enough to do it by sending data back tha has been updated

          } else {
          
          return currentItem; //return other cartItems unchanged if it doesnt match the ID
          }
      //updateCart function here
    })

    })

  }//onClickMinus()

  // TODO: need an update and send data to backend with the quantities. Minimise data to backend and send back just quantity. of item changed. Just send back within the loop above. use the updated true property to send back the items that have changed  

  //TODO: just send data back then at the end and would just send back the product id and qty and use map to extract those values and send those back. 

  //TODO: get update button to work and get the state and get the appropriate post request. Each loop in the backend that for each of the lineitems that are sent and update the quantity. Just extract qty and cartlineItem by id. Make sure it works when you test it. 

  onClickPlus = (lineItemId) => {
    // console.log("uantity state", this.state.cart.id)
    this.setState({
      cart: this.state.cart.map(currentItem => {
        //use map to see item ID or other items which we ignore 
        if (currentItem.id === lineItemId) {
          //this is the current we update 
          //return new object
          const newItem = { ...currentItem, qty: currentItem.qty + 1 }
          this.updateCart(newItem);
          return newItem
          //POSTREQUEST---------------------------------------------------

          //updated:true if we were smart enough to do it by sending data back tha has been updated
        } else {
          return currentItem; //return other cartItems unchanged if it doesnt match the ID
        }
        //UPDATECARTFUNCTION HERE
      })
    })

  }//onClickPlus()


  deleteItem = async (item) => {
    this.setState({loading: true})

    try{
      console.log('thiscartdelete', item)
      const deleteRes = await axios.delete(`${BASE_CART_URL}/destroy/${ item}`)
      console.log('Delete Cart Response', deleteRes.data)
    }catch(err){
      console.log('Error deleting cart line item', err)
    }
  }//deleteItem()

  onClickRemove = (lineItemId) => {
    const newCart = this.state.cart.filter((item)=> {
      if (lineItemId === item.id){
        this.deleteItem(item.product_id); //tellint he server we gfound the one that we want to delete
        return false; //this is the product we want to delete so tell the filter to exclude it
      }else{
        return true; //dont delete the item if the condition above is satisfied
      }
    });//endoffilter()

    this.setState({cart: newCart});



    // let arr = [...this.state.cart]; //make a copy of this


    // const index = arr.findIndex(object => {
    //   console.log("OBJECTID LINEITEMUID", object.id, lineItemId)
    //   return object.id === lineItemId;
    // });

    // if (index !== -1) {
      
    //   // console.log("array to delete", arr.product_id)
    //   // let productIdDelete;
    //   // arr.map(productId => {
    //   //   productIdDelete = productId.product_id
    //   //   // console.log("PROFUCTID", productId.product_id)
    //   //   return productIdDelete
    //   // })
    //   const productIdDelete = this.state.cart[index].product_id

    //   this.deleteItem(productIdDelete);
    //   console.log("index", index)
    //   arr.splice(index, 1);
    //   this.setState({ cart: arr });
      
    // }


  } //onClickRemove()

  handleSubmit = async (ev) => {
    ev.preventDefault();
    this.props.history.push(`/orders`);

  }//handleSubmit()


  render() {
    const { error, cart } = this.state;
    // console.log('check RENDER', this.state)

    if (error) {
      return <p>Error loading</p>
    }

    const cartList = cart.map(c => (

      // console.log('Check image', this.matchImage(c.product_id).image)
      <li className='cartcss' key={c.id}>
        <img className="cartImage" src={`https://floating-eyrie-21279.herokuapp.com/assets/${c.product.image}`} alt="productName" />
        <p>{c.product.name}</p>
        <p>${c.product.price}</p>

        <div className='cartIndex'>

          <p>
            {this.props.hideEditControls || <button className='cartButton' onClick={() => this.onClickMinus(c.id)}>-</button>}
            QTY:{c.qty}
            {this.props.hideEditControls || <button className='cartButton' onClick={() => this.onClickPlus(c.id)}>+</button>}
          </p>
          
          <br />
          {this.props.hideEditControls || <button className='cartRemoveButton' onClick={() => this.onClickRemove(c.id)}>Remove Item</button>}

        </div>

      </li>
    )

    )

    return (
      <div className='checkout'>

        {this.props.hideProductPage || cartList}

        {this.props.hideEditControls || <form onSubmit={this.handleSubmit}>
          <button className='checkoutButton' type="submit">Checkout</button>
        </form>}

      </div>
    );
  }
}

export default Cart;


