import React from 'react';
import { client } from '../../index.js'
import { gql } from '@apollo/client';
import s from './Style/order.module.css';
import notAvailable from '../../not-available.png'
import { AppContext } from '../../App.js';
import shadow from '../shadow.module.css';
import { NavLink } from 'react-router-dom';

export const CartsPage_Query = gql`
{
  category{
    name
     products{
        id
        name
        inStock
        gallery
        description
        category
        brand
        prices{
          currency{
            symbol
          }
          amount
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        }
       }
      }
`
  ;

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }
  componentDidMount = async () => {
    const response = await client.query({
      query: CartsPage_Query
    })
    this.setState({
      products: response.data.category.products
    })
  }
  hadleChange = (event) => {
    this.setState({ quantity: event.target.value });
  }
  render() {
    let cartPrice = this.props.selectValue.slice(0, -4);
    if (this.state.products.length == 0) return null;
    let CartItems = this.props.countId.quantityId.map(i => i.id);
    let Click;
    if (CartItems.length > 0 ? this.props.isClickOn == true : null) {
      Click = shadow.allIpacity;
    } else if(CartItems.length < 0 ? this.props.isClickOn == false : null) {
      Click = null;
    }

    return (
      <AppContext.Consumer>
        {value => (
          <div>
            <center><div className={s.SaccessfulOrder}>Thank you for choosing ScandiWeb Shop!</div></center>
            <div className={s.inheritUp} />
            <div>
              {this.state.products.map((products, productsIndex) => (
                this.props.countId.quantityId.map((item) => (item.id == products.id ?
                  <div key={products.id} >
                    <div className={s.heightContainer}>
                      <div key={products.name} className={s.nameProduct}>{products.name}</div>
                      <div key={products.brand} className={s.subNameProduct}>{products.brand}</div>
                      <div>
                        {products.prices.map((prices) => (
                          cartPrice === prices.currency.symbol ?
                            <div key={prices.amount}>
                              <div className={s.priceProduct}>
                                {prices.currency.symbol ? prices.currency.symbol + " " + prices.amount : null}
                              </div>

                            </div>
                            : null))}
                      </div>
                    </div>
                    <div className={s.imgContainer}>
                      <img key={products.gallery}className={s.imgProduct} src={products.gallery[0]} />
                    </div>
                    <div className={s.middleContainer}>
                      {products.attributes.map((attributes,attributeIndex) => {
                        return (
                          <div key={attributes.id}>
                            <div  className={s.attributesName}>Selected {attributes.name}:</div>
                            {attributes.items.map((itemss) => {
                              return (<div key={`${productsIndex}-${attributeIndex}-${itemss.id}`}className={s.attributesButton}>
                              <div className={attributes.type === "text" ?this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.itemsAttrributesActive : s.itemsAttrributes : (this.props.activeColor.find((color)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`=== color.id)) ? itemss.displayValue === "White" ?s.itemsAttrributesColorActiveWhite:s.itemsAttrributesColorActive : itemss.displayValue === "White" ? s.itemsAttrributesColorWhite: s.itemsAttrributesColor)} style={{ background: itemss.value }}
                                >
                                <button className={attributes.type === "text" ? (this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.buttonInfoActive : s.buttonInfo) : s.buttonInfo} >
                                  {attributes.id != "Color" ? itemss.displayValue : null}
                                </button>
                                          </div>
                                          
                                        </div>)
                            })}

                          </div>
                        )
                      })}
                    </div>
                    <div>
                    <div className={s.incrementProduct}>
                      <div className={s.count}>x{item.quantity}</div>
                    </div>
                    </div>
                    <div className={s.inheritBottom}/>
                  </div >
                  : null))))}
              <div className={s.totalPraceContainer}>
                <div>
                  <div>Tax 21%: <b>{this.props.selectValue.slice(0, -4) + " "}{value.state.countId.quantityId.reduce((acc, ci) => {
                    const product = this.state.products.find(p => (p.id == ci.id));
                    const price = product.prices.find(c => c.currency.symbol == this.props.selectValue.slice(0, -4));
                    return acc + (price.amount * ci.quantity) * 0.21;
                  }, 0).toFixed(3).slice(0, -1)
                  }</b></div>

                  <div>Quantity: <b>{this.props.countId.quantityId.reduce((acc, i) => (acc + i.quantity),0) }</b></div>

                  <div>Total: <b>{this.props.selectValue.slice(0, -4) + " "}{value.state.countId.quantityId.reduce((acc, ci) => {
                    const product = this.state.products.find(p => (p.id == ci.id));
                    const price = product.prices.find(c => c.currency.symbol == this.props.selectValue.slice(0, -4));
                    return acc + price.amount * ci.quantity
                  }, 0).toFixed(3).slice(0, -1)
                  }</b></div>

                </div>
                <div className={s.buttonOrder}>
                  <NavLink to="/" ><button className={s.order}>Back To Shop</button></NavLink>
                </div>
              </div>
            </div>
            <div>
            </div>

            
          </div>)}
      </AppContext.Consumer>
    )
  }
}
export default Order;