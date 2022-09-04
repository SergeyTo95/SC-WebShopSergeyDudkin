import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import { client } from './index.js'
import { gql } from '@apollo/client';
import Header from './components/Header/Header';
import Clothes from './components/Page/Clothes/Clothes';
import Tech from './components/Page/Tech/Tech';
import All from './components/Page/All/All';
import ProductsInfo from './components/Products/ProductsInfo/ProductsInfo';
import CartPage from './components/Carts/CartPage';
import NotFound from './components/Page/404/404';
import Order from './components/Successful/Order';

export const AppContext = React.createContext('id')

export const App_Query = gql`
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
  export const Curr_Query = gql`
  {
    currencies{
      label
      symbol
    }
  }
  `
  ;

class App extends Component {
  Data;
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      currencies: [],
      defaultSelectText: "$ USD",
      selectValue: "",
      showOptionList: false,
      id: [],
      countId:{quantityId:[]},
      infoIndex: 0,
      isClickOn: false,
      activeName: [],
      activeColor: [],
      activeAll: '',
      activeTech: false,
      activeClothes: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAttribute = this.handleAttribute.bind(this);
    this.colorAttribute = this.colorAttribute.bind(this);
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecrementItem = this.DecrementItem.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
  }
  handleClickOutside = e => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      this.setState({
        showOptionList: false
      });
    }
  };
  
  // This method handles the display of option list
  handleListDisplay = () => {
    this.setState(prevState => {
      return {
        showOptionList: !prevState.showOptionList
      };
    });
  };
  
  handleOptionClick = e => {
    this.setState({
      selectValue: e.target.getAttribute("data-name"),
      showOptionList: false
    });
  };
  
  handleClick() {
    this.setState(prevState => ({
      isClickOn: this.state.countId.quantityId.length > 0?!prevState.isClickOn: true
    }));
  }
  handleAttribute(e) {
    this.setState({activeName: this.state.activeName.concat(Object.assign({id: (e.currentTarget.id)})) })
    const name = e.currentTarget.id;
    const nameFound = this.state.activeName.find(element => element.id === name);
    if(nameFound){
      this.setState({
        activeName: [
            ...this.state.activeName.filter(element => element.id !== name)
          ]
      })
    }
  }
  colorAttribute(e) {
    this.setState({activeColor: this.state.activeColor.concat(Object.assign({id: (e.currentTarget.id)})) });
    const color = e.currentTarget.id;
    const colorFound = this.state.activeColor.find(element => element.id === color);
    if(colorFound){
      this.setState({
        activeColor: [
            ...this.state.activeColor.filter(element => element.id !== color)
          ]
      })
    }
  }

  CountId = (event) => {
    const id = event.currentTarget.id
    this.IncrementItem(id)
    this.handleNext(id)
    const itemFound = this.state.countId.quantityId.find(element => element.id === id);
    if (itemFound) {
      const indexOfItemFound = this.state.countId.quantityId.indexOf(itemFound)
      this.setState({
        countId: {
          ...this.state.countId,
          quantityId: [
            ...this.state.countId.quantityId.slice(0, indexOfItemFound),
            { ...itemFound, quantity: itemFound.quantity + 1},
            ...this.state.countId.quantityId.slice(indexOfItemFound + 1),
          ]
        }
      })
  }
  }
  
  componentDidMount = async () => {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.Data = JSON.parse(localStorage.getItem('data'));
    
    if(localStorage.getItem('data')){
      this.setState({
        selectValue: this.Data.selectValue,
        countId: this.Data.countId,
        activeName: this.Data.activeName,
        activeColor: this.Data.activeColor,

      })
    } else {
      this.setState({
      selectValue: "$ USD",
      countId: {quantityId:[]},
      activeName: [],
      activeColor: []
      })
    }
    
    const response = await client.query({
      query: App_Query
    })
    const responsecur = await client.query({
      query: Curr_Query
    })
    this.setState({
      products: response.data.category.products
    })
    this.setState({
      currencies: responsecur.data.currencies
    })

  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('data', JSON.stringify(nextState))
  }
  

  IncrementItem = (id) => {
    const itemFound = this.state.countId.quantityId.find(element => element.id === id);
    if (itemFound) {
      const indexOfItemFound = this.state.countId.quantityId.indexOf(itemFound)
      this.setState({
        countId: {
          ...this.state.countId,
          quantityId: [
            ...this.state.countId.quantityId.slice(0, indexOfItemFound),
            { ...itemFound, quantity: itemFound.quantity + 1, imgIndex: 0, infoIndex: 0 },
            ...this.state.countId.quantityId.slice(indexOfItemFound + 1),
          ]
        }
      })
  }
    
    else {
      this.setState({
        countId: {
          ...this.state.countId,
          quantityId: [
            ...this.state.countId.quantityId,
            { id: id, quantity: 1, imgIndex: 0 }
          ]
        }
      })
    } 
  }
  handleNext= (id) =>{
    const itemFound = this.state.countId.quantityId.find(element => element.id === id);
    const img = this.state.products.find((products) =>products.id === id )
    if (itemFound) {
      const indexOfItemFound = this.state.countId.quantityId.indexOf(itemFound)
      this.setState({
        countId: {
          ...this.state.countId,
          quantityId: [
            ...this.state.countId.quantityId.slice(0, indexOfItemFound),
            { ...itemFound, imgIndex: img.gallery?.length -1 != itemFound.imgIndex ? itemFound.imgIndex + 1 : 0} ,
            ...this.state.countId.quantityId.slice(indexOfItemFound + 1),
          ]
          
        }
        
      })
      
  }

  

}
  handlePrev = (id) =>{
    const itemFound = this.state.countId.quantityId.find(element => element.id === id);
    const img = this.state.products.find((products) =>products.id === id )
    if (itemFound) {
      const indexOfItemFound = this.state.countId.quantityId.indexOf(itemFound)
      this.setState({
        countId: {
          ...this.state.countId,
          quantityId: [
            ...this.state.countId.quantityId.slice(0, indexOfItemFound),
            { ...itemFound, imgIndex: itemFound.imgIndex > 0?itemFound.imgIndex -1: img.gallery?.length -1},
            ...this.state.countId.quantityId.slice(indexOfItemFound + 1),
          ]
        }
      })
  }

}
handleDown = () =>{

    this.setState(prevState=>{
      return{
          infoIndex: this.state.infoIndex < 0 ? prevState.infoIndex - 4 : 5}
    })   
 }

handleUp = () =>{

  this.setState(prevState=>{
        return{infoIndex: this.state.infoIndex > 7? prevState.infoIndex + 4 : 0} 
  })   
}


  DecrementItem = (id) => {
    const itemFound = this.state.countId.quantityId.find(element => element.id === id);
    if (itemFound) {
      const indexOfItemFound = this.state.countId.quantityId.indexOf(itemFound)
      if (itemFound.quantity > 1) {
        this.setState({
          countId: {
            ...this.state.countId,
            quantityId: [
              ...this.state.countId.quantityId.slice(0, indexOfItemFound),
              { ...itemFound, quantity: itemFound.quantity - 1 },
              ...this.state.countId.quantityId.slice(indexOfItemFound + 1),
            ]
          }
        })
      }
      else {
        this.setState({
          countId: {
            ...this.state.countId,
            quantityId: [
              ...this.state.countId.quantityId.filter(element => element.id !== id)
            ]
          }
        })
      }
    }
    
  }
  render() {
    return (
      <div >
        <BrowserRouter>
          <AppContext.Provider value={{ state: this.state }}>            
        <div>
          <Routes>
              <Route to="/" element={<Header products={this.state.products} handleClickOutside={this.handleClickOutside} handleListDisplay={this.handleListDisplay} handleOptionClick={this.handleOptionClick} showOptionList={this.state.showOptionList} currencies={this.state.currencies} selectValue={this.state.selectValue}countId={this.state.countId}
            activeName={this.state.activeName}
            activeColor={this.state.activeColor} IncrementItem={this.IncrementItem} DecrementItem={this.DecrementItem} QuantityChange={this.QuantityChange} quantity={this.state.quantity} handleClick={this.handleClick} isClickOn={this.state.isClickOn} handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute} isAttribute={this.state.isAttribute} handleChange={this.handleChange}/>} >
                <Route index element={<Navigate to='/All' />} />
                <Route path='All' element={<All products={this.state.products} clickId={this.CartId} isClickOn={this.state.isClickOn} CountId={this.CountId}countId={this.state.countId}  />} />
                <Route path='Tech' element={<Tech products={this.state.products} clickId={this.CartId} CountId={this.CountId} isClickOn={this.state.isClickOn} countId={this.state.countId} />} />
                <Route path='Clothes' element={<Clothes products={this.state.products} clickId={this.CartId} CountId={this.CountId} isClickOn={this.state.isClickOn}countId={this.state.countId}/>} />
                <Route path='All/Cart' element={this.state.countId.quantityId.length < 1 ?<Navigate to='/' />:<CartPage handleNext={this.handleNext} handlePrev={this.handlePrev}selectValue={this.state.selectValue} products={this.state.products}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor}
                handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute}  quantity={this.state.quantity} isClickOn={this.state.isClickOn} countId={this.state.countId}IncrementItem={this.IncrementItem} DecrementItem={this.DecrementItem} />} />
                <Route path='Tech/Cart' element={this.state.countId.quantityId.length < 1 ?<Navigate to='/' />:<CartPage handleNext={this.handleNext} handlePrev={this.handlePrev} selectValue={this.state.selectValue} products={this.state.products}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor}
                handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute}  quantity={this.state.quantity} isClickOn={this.state.isClickOn} countId={this.state.countId}IncrementItem={this.IncrementItem} DecrementItem={this.DecrementItem} />} />
                <Route path='Clothes/Cart' element={this.state.countId.quantityId.length < 1 ?<Navigate to='/' />:<CartPage handleNext={this.handleNext} handlePrev={this.handlePrev} selectValue={this.state.selectValue} products={this.state.products}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor}
                handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute}  quantity={this.state.quantity} isClickOn={this.state.isClickOn} countId={this.state.countId}IncrementItem={this.IncrementItem} DecrementItem={this.DecrementItem} />} />

                <Route path='Order' element={<Order selectValue={this.state.selectValue}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor}
                handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute}  quantity={this.state.quantity} isClickOn={this.state.isClickOn} countId={this.state.countId}/>} />
                
                <Route path='All/:id' exact element={<ProductsInfo infoIndex={this.state.infoIndex} handleUp={this.handleUp} handleDown={this.handleDown} products={this.state.products} selectValue={this.state.selectValue} clickId={this.CartId}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor} CountId={this.CountId} handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute} activeClick={this.activeClick} isClickOn={this.state.isClickOn} countId={this.state.countId} />} />
                <Route path='Tech/:id' exact element={<ProductsInfo infoIndex={this.state.infoIndex} handleUp={this.handleUp} handleDown={this.handleDown} products={this.state.products} selectValue={this.state.selectValue} clickId={this.CartId}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor} CountId={this.CountId} handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute} activeClick={this.activeClick} isClickOn={this.state.isClickOn} countId={this.state.countId} />} />
                <Route path='Clothes/:id' exact element={<ProductsInfo infoIndex={this.state.infoIndex} handleUp={this.handleUp} handleDown={this.handleDown} products={this.state.products} selectValue={this.state.selectValue} clickId={this.CartId}
                activeName={this.state.activeName}
                activeColor={this.state.activeColor} CountId={this.CountId} handleAttribute={this.handleAttribute} colorAttribute={this.colorAttribute} activeClick={this.activeClick} isClickOn={this.state.isClickOn} countId={this.state.countId} />} />
                <Route path='*' element={<NotFound/> }/>
                </Route>
              </Routes>

            </div>
          </AppContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;