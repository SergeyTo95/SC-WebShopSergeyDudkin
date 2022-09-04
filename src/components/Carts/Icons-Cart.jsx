import { Component } from "react";
import Carts from './Carts'
import Cart1 from './icons/Cart1.png';
import Cart2 from './icons/Cart2.png';
import Cart3 from './icons/Cart3.png';
import s from './iconscart.module.css';

class IconCart extends Component {

    render(){
        
    return(
    <div className={s.iconcart}>
        <div className={s.cart}>
            <img src={Cart1} alt="img.cart1"/>
        </div>
        <div className={s.wheel}>
            <img src={Cart2} alt="img.cart2"/>
            <img src={Cart3} alt="img.cart3"/>
        </div>
        <div />
        
    </div> 
    )
  }
}

export default IconCart;