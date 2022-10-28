import React, { useContext } from "react"
import { AppContext } from "./../App";


export const Info = ({title, descr, img}) => {
  
  
  const {setCartOpened} = useContext(AppContext)
    

  return (
    <div className="cart__empty">
        <img src={img} alt="empty" />
        <h2 className="cart__empty-text">{title}</h2>
        <p className="cart__empty-desrc">{descr}</p>
        <button className="cart__empty-bttn bttn-green" onClick={()=> setCartOpened(false)} ><img src="/img/arrow.svg" alt="arrow" /> Повернутися за покупками!</button>
    </div>
  )
}
// /img/empty-cart.jpg
// Ваш кошик порожній. Додайте хоча б 1 товар, щоб це вікно змінилося.