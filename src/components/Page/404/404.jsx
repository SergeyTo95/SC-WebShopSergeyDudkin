import { Component } from "react";
import { NavLink } from "react-router-dom";
import s from "./style/404.module.css"

class NotFound extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
         <div>
           <div className={s.notFound}>404 page not found...</div>
           <div className={s.redirect}><NavLink to={`/`}>Back to shop</NavLink></div>
         </div>
        )
    }
}

export default NotFound;