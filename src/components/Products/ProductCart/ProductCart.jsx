import React from 'react';
import s from './productCart.module.css';
import Cart1 from './icons/Cart1.png';
import Cart2 from './icons/Cart2.png';
import Cart3 from './icons/Cart3.png';

class ProductCart extends
     React.Component {
         render(){
    return(
        <div >
            <div className={s.Cart}>
                <img src={Cart1}/>
                </div>
                <div className={s.Wheel1}>
                <img src={Cart2}/>
                    </div>
                <div className={s.Wheel2}>
                <img src={Cart3}/>
                    
            </div>

        </div>
    )
}}

export default ProductCart;