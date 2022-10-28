import axios from "axios";
import React, { useEffect, useState } from "react"
import Card from "./../components/Card/Card";

function Orders() {

  const [orders, setOrders] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    try{
      (async ()=>{
        const {data} = await axios.get('https://63544bc2ccce2f8c0206bc4e.mockapi.io/orders');
        setOrders(data.map(obj => obj.items).flat());
        setIsLoading(false)
      })();
    }catch(e){
      alert('Помилка при оформленні даних замовлення')
      console.error(e)
    }

  }, [])

  return (
    <div className="content">
        <div className="content__header">
        <h1>Мої замовлення</h1>
        </div>

    <div className="cards">
    {(isLoading ? [...Array(10)] : orders).map((item, index) => 
            <Card 
            key={index}
            loading={isLoading}
        {...item}
            />
        )}
    </div>  
    
    </div>
  )
}
export default Orders