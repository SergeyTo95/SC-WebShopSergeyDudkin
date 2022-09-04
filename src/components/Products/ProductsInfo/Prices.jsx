import React, { Component } from 'react';
import {client} from '../../../index.js'
import { gql } from '@apollo/client';
import s from './Style/price.modale.css';

export const Amount_Query = gql`
{
  category{
    name
     products{
        id
        name
        gallery
        description
        brand
        prices{
          currency{
            symbol
          }
          amount
         } 
      }
     }
    }
`
;

class Prices extends Component {
    state={
      products: [],
      prices: []
  }

  
  componentDidMount = async () =>{
    const response = await client.query({
      query: Amount_Query
    })
    this.setState({
      products:response.data.category.products
    })  
  }
  render() {
   
  return(
    
      <div>
          {this.state.products.map((products) =>(
                <div key={products.id}>
                  {products.prices.map((prices) => {
                            return(
                              <div className={s.price}>
                              <div>{prices.amount}</div>
                              
                              </div>
                            )})} 
                </div>
                )
              )
          }
      </div>
    );
  };

}


export default Prices;