import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import IconCart from '../Carts/Icons-Cart';
import s from './header.module.css';
import logo from '../../logo.png';

import Currency from '../Products/Currency/Currency';
import { CartMini } from '../Carts/Carts';

class Header extends
  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickOn: false
    };

  }

  render() {
    let CartItems = this.props.countId.quantityId.map(c => c.id);
    let Click;
    if (CartItems.length > 0 != []) {
      Click = this.props.isClickOn;
    } else {
      Click = null;
    }
    return (
      <div>
      <div className={s.header}>
        <div className={s.navheader}>
          <div>
            <nav>
              <NavLink to="/All" className={({ isActive }) => isActive ? s.active : ""}
            style={({ isActive }) => isActive ? {color:'mediumseagreen'}: {color:'black'}}>All</NavLink>
              <NavLink to="/Tech" className={({ isActive }) => isActive ? s.active : ""}
              style={({ isActive }) => isActive ? {color:'mediumseagreen'}: {color:'black'}}>Tech</NavLink>
              <NavLink to="/Clothes" className={({ isActive }) => isActive ? s.active : ""}
              style={({ isActive }) => isActive ? {color:'mediumseagreen'}: {color:'black'}}>Clothes</NavLink>
            </nav>
          </div>
        </div>
        <div className={s.logo}>
          <img src={logo} alt="logo.img" />
        </div>
        <div>
          <div className={s.currency} ><Currency selectValue={this.props.selectValue}handleClickOutside={this.props.handleClickOutside} handleListDisplay={this.props.handleListDisplay} handleOptionClick={this.props.handleOptionClick} showOptionList={this.props.showOptionList} currencies={this.props.currencies}/></div>
        </div>
        <div onClick={this.props.handleClick} className={this.state.isClickOn?s.night:null} style={CartItems.length > 0 ?{cursor: 'pointer'}: {cursor: 'auto'}}>
          <IconCart />
        </div>
        {Click ?
          <CartMini products={this.props.products} IncrementItem={this.props.IncrementItem} countId={this.props.countId} DecrementItem={this.props.DecrementItem} QuantityChange={this.props.QuantityChange} quantity={this.props.quantity} handleAttribute={this.props.handleAttribute}
          colorAttribute={this.props.colorAttribute} isAttribute={this.props.isAttribute}activeName={this.props.activeName} activeColor={this.props.activeColor}
          />
          : null}
        <div className={this.props.countId.quantityId.reduce((acc,c) => (acc+ c.quantity),0 > 0) ? s.circule : null}>
          <div className={s.circuleItem}>{this.props.countId.quantityId.reduce((acc,c) => (acc+ c.quantity),0 > 0) ? (this.props.countId.quantityId.reduce((acc, q) => (acc + q.quantity),0) ) : null}</div>
        </div>
      </div>
       <Outlet/>
       </div>

    )

  }
}
export default Header;
