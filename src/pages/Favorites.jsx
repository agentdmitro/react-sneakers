import React, { useContext } from "react"
import Card from "../components/Card/Card"
import { AppContext } from "./../App";

function Favorites() {

  const state = useContext(AppContext);
   
  return (
    <div className="content">
        <div className="content__header">
        <h1>Збережене</h1>
        </div>

    <div className="cards">
    {state.favs
        .map(item => 
            <Card 
            key={item.id}
            favorited={true}
            onFav={state.onAddToFav}
            onPlus={(obj)=> state.onAddToCart(obj)}
            {...item}
            />
        )}
    </div>
    
    </div>
  )
}
export default Favorites