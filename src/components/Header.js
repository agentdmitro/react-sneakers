import React from 'react'
import {Link} from 'react-router-dom'
import { useCart } from "./../hooks/useCart";

function Header(props) {

  const {totalPrice} = useCart();

  return (
    <header className="header">  
          <Link to="/">
          <div className="header__logo">
            <img width={40} height={40} src="img/logo.png" alt='logo'/>
            <div className="logo-text">
              <h3>React sneakers</h3>
              <p>Магазин найкращих кросівок</p>
            </div>
          </div>
          </Link>
          <ul className="header__menu">
            <li style={{cursor: 'pointer'}} onClick={props.onClickCart}>
            <div className="img">
              <img src="img/cart.svg" alt="card" />
            </div>
              {totalPrice} грн.
            </li>
            <li>
            <div className="img">
              <Link to="/favorites"><img src="img/heart.svg" alt="user" /></Link>
            </div>
            </li>
            <li>
            <div className="img">
              <Link to='/orders'><img src="img/user.svg" alt="user" /></Link>
            </div>
            </li>
          </ul>
      </header>
  )
}
export default Header