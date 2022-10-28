import Header from "./components/Header";
import Side from "./components/Side/Side";
import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favs, setFavs] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
      try{
        async function fetchData(){
          const [cartResp, favResp, itemsResp] = await Promise.all([
            axios.get('https://63544bc2ccce2f8c0206bc4e.mockapi.io/cart'), 
            axios.get('https://63544bc2ccce2f8c0206bc4e.mockapi.io/favorites'), 
            axios.get('https://63544bc2ccce2f8c0206bc4e.mockapi.io/items')
            ])

          setIsLoading(false)
  
          setCartItems(cartResp.data)
          setFavs(favResp.data)
          setItems(itemsResp.data)
        }

        fetchData()

      }catch(e){
        alert('Сталася помилка під час обробки даних(')
        console.log(e)
      }
      
  }, []);



  const onAddToCart = async (obj) =>{
   try{
    const findItem = cartItems.find(cartObj => Number(cartObj.parentId) === Number(obj.id))

    if(findItem){
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
      axios.delete(`https://63544bc2ccce2f8c0206bc4e.mockapi.io/cart/${findItem.id}`)
    }else{
      setCartItems(prev => [...prev, obj])
      const {data} = await axios.post('https://63544bc2ccce2f8c0206bc4e.mockapi.io/cart', obj)
      setCartItems(prev => prev.map(item=> {
        if(item.parentId === data.parentId){
          return {
            ...item, 
            id: data.id};
        }
        return item   
      }))
    }
   }catch(e){
    alert('Сталася помилка під час виконання операції')
   }
  }

  const onAddToFav =  async (obj) =>{
     try{
      if(favs.find(favObj=> favObj.id === obj.id)){
        await axios.delete(`https://63544bc2ccce2f8c0206bc4e.mockapi.io/favorites/${obj.id}`)
        setFavs((prev)=>prev.filter((item) => item.id !== obj.id)) // Якщо треба видалити візуально
       }else{
        const { data } = await axios.post('https://63544bc2ccce2f8c0206bc4e.mockapi.io/favorites', obj)
        setFavs(prev => [...prev, data])
       }
     }catch(e){
      alert('Упс, виникла помилка')
      console.log(e)
     }
  }

  const onRemoveItem = async (id) => {
    try{

      axios.delete(`https://63544bc2ccce2f8c0206bc4e.mockapi.io/cart/${id}`)

      setCartItems((prev)=>prev.filter((item) => Number(item.id) !== Number(id)))
    }catch(e){
      alert('Сталася помилка під час виконання операції')
      console.log(e)
    }
  }
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }


  const isItemAdded = (id) =>{
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }
  
    cartOpened ? document.body.classList.add('lock') : document.body.classList.remove('lock');

  return (
    <AppContext.Provider value={{setCartOpened, items, cartItems, favs, isItemAdded, onAddToFav, setCartItems, onAddToCart}}>
      <div className='wrap'>
        
          <div>
            <Side 
              items={cartItems}
              onClose={() => setCartOpened(false)}
              onRemove={onRemoveItem}
              opened={cartOpened}
            />
          </div>

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route 
          path="" 
          exact
          element={
            <Home 
              searchValue = {searchValue}
              items = {items}
              cartItems = {cartItems}
              onAddToFav={onAddToFav} 
              onAddToCart = {onAddToCart}
              onChangeSearchInput = {onChangeSearchInput}
              setSearchValue = {setSearchValue}
              isLoading={isLoading}
            />
          }/>
          <Route path="favorites" element={<Favorites />} exact/>
          <Route path="orders" element={<Orders />} exact   />
        </Routes>

        
    </div>
    </AppContext.Provider>
  );
}

export default App;
