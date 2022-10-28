import cl from './card.module.scss'
import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader"
import { AppContext } from '../../App';

function Card({id, onFav, title, price, img, onPlus, favorited = false, loading = false}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFav, setIsFav] = useState(favorited)
  const itemData = { title, price, img, id, parentId: id }
  function onClickPlus() {
    onPlus(itemData);
    
  }
  const onClickFav = () => {
    onFav(itemData)
    setIsFav(!isFav)
  }


  return (
    <div className={cl.card} key={id} id={id}>
    {loading ? 
      <ContentLoader
          speed={2}
          width={178}
          height={250}
          viewBox="0 0 178 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="178" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="178" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="130" height="15" />
          <rect x="1" y="224" rx="5" ry="5" width="80" height="25" />
          <rect x="144" y="220" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
        : 
        <>
        {onFav && 
        <div className={cl.card__fav} onClick={onClickFav}>
          <img src={isFav === true ? '/img/liked.svg' : '/img/unliked.svg'} alt="header unliked"/>
        </div>
        }
        <img width={133} height={112} src={"/img/sneakers/"+ img +".jpg"} alt="sneakers img" className={cl.card__img} />
        <h5>{title}</h5>
        <div className={cl.card__content}>
            <div className={cl.card__price}>
            <span>Ціна</span>
            <b>{price} грн.</b>
            </div>
            {onPlus && <img style={{padding: '10px'}} onClick={onClickPlus} src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'} alt="Plus" />}
        </div>
        </>
    }
    </div>
  )
}
export default Card