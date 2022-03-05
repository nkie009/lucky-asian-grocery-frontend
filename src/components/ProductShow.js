import axios from "axios";
import React from "react";
// import '../App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import { Cloudinary } from "@cloudinary/url-gen";
import { cld } from '../config/index'
import { AdvancedImage } from '@cloudinary/react';
import './productshow.css'




const BASE_PRODUCT_URL = "http://localhost:3000/api";

class ProductShow extends React.Component {


    state = {
        resultsProduct: {},
        error: null,
        loading: true

    }
    componentDidMount() {
        this.revealProduct();

    }

    revealProduct = async () => {
        this.setState({ loading: true });
        try {
            const res = await axios.get(`http://localhost:3000/api/products/${this.props.match.params.id}`);
            console.log('RES.DATA response', res.data);
            this.setState({
                resultsProduct: res.data,
                loading: false  // stop showing loading message
            });
        } catch (err) {
            console.log('Error in search AJAX: ', err);
            this.setState({ error: err, loading: false });
        }

        

    };//revealProduct()

    handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log('handleSubmit()', this.state.resultsProduct.id)
        try {
            const cartRes = await axios.post(`http://localhost:3000/api/cart/add/${this.state.resultsProduct.id}`);
            this.props.history.push(`/cart`)
            console.log('SHOW CART DATA', cartRes.data);
        } catch (err) {
            console.log('Error in search AJAX:', err);
        }

    }//add to cart  handleSubmit


    render() {
        
        if (this.state.loading === true){
            return <h2>Loading Product...</h2>
        }

        const myImage = cld.image(this.state.resultsProduct.image)

        const { name, description, image, price, stock } = this.state.resultsProduct;

        console.log('SEE IMAGE', this.state.resultsProduct)
        
        // const {loading, error, resultsProduct} = this.state
        // console.log("resultsProduct", this.state.resultsProduct.name)
        if (this.state.error) {
            return <p>Error loading</p>
        }
        
        


        return (

            
            

            <div className='showProduct'>

                <h2>{name}</h2>

            {
                image.startsWith('IMG_')
                ?
                <img className="cartImage" src={`http://localhost:3000/assets/${image}`} alt={name}/>
                :
                <AdvancedImage cldImg={cld.image(image)} />
            }

          

                {/* <AdvancedImage cldImg={(myImage)} /> */}

                <br />
                <strong>Description</strong>
                <p>{description}</p>
                <br />
                <strong>Stock</strong>
                <p>{stock}</p>
                <strong>Price</strong>
                <br />
                <p>${price}</p>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <button type="submit" className='addButton'>Add to Cart</button>
                </form>
            </div>


        )//return()




    } //render()



};// ProductShow class

export default ProductShow



