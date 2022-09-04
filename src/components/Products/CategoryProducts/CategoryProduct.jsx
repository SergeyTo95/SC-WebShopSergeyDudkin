import React, { Component } from "react";
import s from './Style/categoryProduct.module.css'


class RouteCategory extends Component{
  CategoryProduct = () =>{
    let route = window.location.pathname;
    let category = route.replace(/^./,"");
    switch (route){
      case '/Tech':
        return category
      case '/Clothes':
        return  category
      case '/All':
        return category
      default:
        return null
     }
    };
render(){
return <div className={s.categoryProduct}>
  {
    this.CategoryProduct() 
  }
    </div>
 }
}
  


class CategoryProduct extends Component {
  render(){
    return(
        <div>
           <div>
           <RouteCategory/>
           
           </div>
        </div>
    )
}
}
export default CategoryProduct;