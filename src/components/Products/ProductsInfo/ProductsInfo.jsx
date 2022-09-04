import React, { Component } from 'react';
import '../../../App.css'
import s from './Style/productsInfo.module.css'
import { Link, NavLink} from 'react-router-dom';
import shadow from '../../shadow.module.css';

class ProductsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
       img: ""
    }
  }
  handleImg = e => {
    this.setState({
      img: e.currentTarget.id
    });
  };

  render() {
    let routes = window.location.pathname;
    let nawRoute = routes.split('/')[1]
    let productsRoute = routes.split('/')[2];
    let newSelectChange = this.props.selectValue.slice(0, -4);
    let CartItems = this.props.countId.quantityId.map(c => c.id);
    let Click;
    if (CartItems.length > 0 ? this.props.isClickOn == true : null) {
      Click = shadow.allIpacity;
    } else if(CartItems.length < 0 ? this.props.isClickOn == false : null) {
      Click = null;
    }
  

    return (
      <div>
        {this.props.products.map((products, productsIndex) => (
          products.id === productsRoute ?
            <div key={products.id} className={Click}>
              <div>
                <div className={s.nameContainer}>
                  <div key={products.brand}className={s.brand}>{products.brand}</div>
                  <div key={products.name}className={s.name}>{products.name}</div>
                  <div className={s.layoutContainer}>
                  {products.attributes.map((attributes,attributeIndex) => {
                    return (
                      <div key={attributes.id}>
                        <div >
                          <div  className={s.attributesName}>{attributes.name}:</div>
                          {attributes.items.map((itemss) => {
                            return (
                   <div key={`${productsIndex}-${attributeIndex}-${itemss.id}`}className={s.attributesButton}>
                    <div className={attributes.type === "text" ?this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.itemsAttrributesActive : s.itemsAttrributes : (this.props.activeColor.find((color)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`=== color.id)) ? itemss.displayValue === "White" ?s.itemsAttrributesColorActiveWhite:s.itemsAttrributesColorActive : itemss.displayValue === "White" ? s.itemsAttrributesColorWhite: s.itemsAttrributesColor)} style={{ background: itemss.value }}
                      onClick={attributes.id ? attributes.type === "text" ? this.props.handleAttribute : this.props.colorAttribute: null} id={`${productsIndex}-${attributeIndex}-${itemss.id}`}>
                      <button className={attributes.type === "text" ? (this.props.activeName.find((active)=>( `${productsIndex}-${attributeIndex}-${itemss.id}`===active.id)) ? s.buttonInfoActive : s.buttonInfo) : s.buttonInfo} >
                        {attributes.id != "Color" ? itemss.displayValue : null}
                      </button>
                                </div>
                                
                              </div>
                          )})}

                        </div>
                      </div>
                    )
                  })}


                  <div >
                    <div className={s.textPrice}>Price:</div>
                    {products.prices.map((prices) => {

                      return (

                        <div key={prices.amount} className={s.price}>

                          <div >{newSelectChange === prices.currency.symbol ? prices.currency.symbol + " " + prices.amount : null} </div>
                        </div>
                      )
                    })}

                  </div>

                  <div key={products.inStock}>
                    {products.inStock ?<NavLink to={`/${nawRoute.replace(`/${productsRoute}\d+/, ''`)}/Cart`}>
                      <button className={s.buttonCart} id={productsRoute} onClick={this.props.CountId}>ADD TO CART</button>
                    </NavLink>: <div className={s.notAvailable}>NOT AVAILABLE</div>}
                  </div>
                  <div className={s.arialDescription}>
                    <div key={products.description} className={s.description} dangerouslySetInnerHTML={{__html: products.description}}>
                      </div>
                  </div>
                </div>
                </div>
                <div className={s.imageContainer}>
               <img key={products.gallery}src={this.state.img === "" ? products.gallery[0] : this.state.img} className={s.gallery} />
                </div>
                <div className={s.miniContainer}>
                {products.gallery.length === 1? <div ><img className={s.onegallery} src={products.gallery[0] }/>
                <img className={s.onegallery} src={products.gallery[0]}/>
                <img className={s.onegallery} src={products.gallery[0]}/>
                <img className={s.onegallery} src={products.gallery[0] }/></div>: 
                <div>


                  <div className={s.MIni}>
                    <div className={s.divUp} onClick={this.props.handleUp}>
                    <div className={s.up} /> 
                    </div>
                    {this.props.infoIndex < 4 ? products.gallery.slice(0,4).map((img) =>(<img key={img} id={img} src={img} onClick={this.handleImg} alt={img} className={s.minigallery}/>
                     )):
                     products.gallery.slice(4,8).map((img) =>(<div ><img key={img} id={img} src={img} onClick={this.handleImg} alt={img} className={s.minigallery}/></div>
                     ))}
                     <div className={s.divDown} onClick={this.props.handleDown}>
                     <div className={s.down} />
                     </div>
                  </div>
                  </div>}
                </div>
              </div>
            </div>
            : null
        )

        )}
      </div>

    );
  };

}

export default ProductsInfo;