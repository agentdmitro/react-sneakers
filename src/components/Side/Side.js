import { Info } from "../Info";
import { useCart } from "../../hooks/useCart";
import React, {useState} from "react";
import axios from "axios";
import cl from './side.module.scss'


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Side({onClose, items = [], onRemove, opened}) {

  const {cartItems, setCartItems, totalPrice} = useCart();

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const onClickOrder = async () => {
    try{
      setIsLoading(true)
      const {data} = await axios.post('https://63544bc2ccce2f8c0206bc4e.mockapi.io/orders', {items: cartItems})
      
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      
      for(let i = 0; i < cartItems.length; i++){
        const item = cartItems[i];
        await axios.delete('https://63544bc2ccce2f8c0206bc4e.mockapi.io/cart/' + item.id)
        await delay(1000)
      }

    }catch(e){
      alert('Упс.. виникла помилка \nЗамовлення НЕ було відправлено')
    }
    setIsLoading(false)
  }
  
  return (
          <>
            <div className={`sideWrap ${opened ? cl.sideWrapOpen : ''}`}>
            <div className={`side ${opened ? cl.sideOpen : ''}`}>
            <div className="side__header">
              <h2>Кошик</h2> 
              <button className="remove-btn" onClick={onClose}>
                    <img src="img/btn-remove.svg" alt="remove" />
              </button>
            </div>
            
            <div className="cart">
              {items.length > 0 ? 
                items.map((obj)=> (
                    
                    <div className="cart__item" key={Number(obj.parentId)} id={Number(obj.parentId)}>
                      <div className="cart__item-img" style={{backgroundImage: 'url("../img/sneakers/'+ obj.img +'.jpg")'}}></div>
                      <div className="cart__item-info">
                        <p>{obj.title}</p>
                        <b>{obj.price} грн.</b>
                      </div>
                      <button className="remove-btn" onClick={() => onRemove(Number(obj.id))}>
                        <img src="img/btn-remove.svg" alt="remove"  />
                      </button>
                    </div>
                    
                  ))
                  :
                  <Info 
                  title={isOrderComplete ? 'Заказ оформлений!' : 'Ваш кошик порожній.'} 
                  descr={isOrderComplete ? `Номер замовлення: ${orderId}` : 'Додайте хоча б 1 товар, щоб це вікно змінилося.'} 
                  img={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
                  />
                  }
              </div>


                {items.length > 0 && 
                  <div className="side-bottom">
                    <ul>
                      <li>
                        <h5>Загальна ціна:</h5>
                        <span></span>
                        <b>{totalPrice} грн.</b>
                      </li>
                      <li>
                        <h5>Податок 5%:</h5>
                        <span></span>
                        <b>{Math.round((totalPrice * 0.95))} грн.</b>
                      </li>
                    </ul>
                    <button disabled={isLoading} onClick={onClickOrder} className="bttn-green">Оформити замовлення <img src="img/arrow.svg" alt="arrow" /></button>
                  </div>}

            
          </div>
            </div>
            <div className={`bg-shadow ${opened ? cl.bgShow : ''}`} onClick={onClose}>
            </div>
        </>
  )
}
export default Side