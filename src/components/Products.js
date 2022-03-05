import React from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ProductShow from './ProductShow';
import { prettyDOM } from '@testing-library/react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { cld } from '../config/index'
import './productindex.css';
import { image } from '@cloudinary/url-gen/qualifiers/source';

const BASE_PRODUCTS_URL = 'https://floating-eyrie-21279.herokuapp.com/api/products';
//replace base url with livelink from heroku to get the images


class Products extends React.Component {


  state = {
    products: [],
    loading: false,
    error: null

  };

  componentDidMount() {
    this.fetchProducts();

  }



  fetchProducts = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(BASE_PRODUCTS_URL)
        ;
      this.setState({
        products: res.data,
        loading: false
      })
      console.log('check this array', this.state.products)
      // console.log('CHECK THIS response', res.data);
    } catch (err) {
      console.log('Error loading AJAX', err);
      this.setState({ error: err, loading: false })
    }
  }

  render() {
    // const myImage = cld.image(this.state.products.image);
    
    const { loading, error, products } = this.state
    console.log('image', products.map(p => cld.image(p.image)));
    // console.log("CHECK Render PRODUCT", this.state)
    if (error) {
      return <p>Error loading</p>
    }

    const productsList = products.map(p =>
      <li className='productIndexLi' key={p.id}>
       <strong> {p.name} </strong>
        <br />
    
        <strong>Price:</strong> ${p.price} <br />
        


        <Link to={`/products/${p.id}`}>
          {
            p.image.startsWith('IMG_')
            ?
            <img className="cartImage" src={`https://floating-eyrie-21279.herokuapp.com/assets/${p.image}`} alt={p.name}/>
            :
            <AdvancedImage cldImg={cld.image(p.image)} />
          }

        </Link>
      </li>
    )

      //loop copy line item to order line items
    return (
      <div>

        <ul>
          {
            this.state.loading
              ?
              <p>Loading results...</p>
              :
              <div className="productsIndex">

                {productsList}

              </div>
          }
        </ul>



      </div>
      // <div>CHECKING IF WORKING</div>
    );
  };

}

export default Products;