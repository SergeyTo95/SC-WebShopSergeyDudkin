import React from 'react';
import RouteCategory from '../../Products/CategoryProducts/CategoryProduct';
import ProductsStore from '../../Products/CategoryProducts/ProductsStore';
import s from '../../shadow.module.css';

class All extends React.Component {
    constructor(props){
        super(props);
    }
   render(){
    let CartItems = this.props.countId.quantityId.map(c => c.id);
    let Click;
    if (CartItems.length > 0 ? this.props.isClickOn == true : null) {
      Click = s.allIpacity;
    } else if(CartItems.length < 0 ? this.props.isClickOn == false : null) {
      Click = null;
    }
    return (
    <div className={Click}>
        <RouteCategory/>
        <ProductsStore products={this.props.products}clickId={this.props.clickId} CountId={this.props.CountId} isClickOn={this.props.isClickOn} />
    </div>
  )
 }
}

export default All;