import { Component } from "react"
import {client} from '../../../index.js'

const Category_Query = gql`
{
  categories{
    name
     }
    }
`
; 
 export class CategoryState extends Component{
    state={
      categories: []
    }
    componentDidMount = async () =>{
      const response = await client.query({
        query: Category_Query
      })
      this.setState({
        categories:response.data.categories
      })
    }
    render(){
        return (
            <div>
              {this.state.categories.map((categories) => (
            
            <div key={categories.name}>
              
              {categories.name}
              {(() => {
                switch(categories.name){
                  case 'tech': {
                    return 'tech'
                  }
                  case 'clothes': {
                    return 'clothes'
                  }
                  case 'all':{
                  return 'all'
                  }
                }       
              }
              )()} 
              </div>
          ))
              }
          </div>
          
        )
    };
      }


 class CategorySort extends Component{
  StateCategory = () =>{
    let state = <CategoryState/>
    let route = window.location.pathname;
    let res = 
     (state ? 'tech' || 'clothes' || 'all' : null)
     return res
  }
  Sort = () =>{
    // let sorts = <CategoryProduct/>;
    let sort = this.StateCategory();
    let route = window.location.pathname;
    // let category = route.replace(/^./,"");
    // let newCategory = category.toLowerCase();
    switch (route) {
      case '/Tech':
        return 'tech';
      case '/Clothes': 
        return 'clothes';
      case '/All':
        return 'all';
        
    }
  };
      render(){
        return <div> 
        {
          this.Sort() 
        }
          </div>
       }
      }
    
export default CategorySort;