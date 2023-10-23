import { Link } from "react-router-dom"
import { useContext } from "react";
import { CartContext } from '../App';
import Icon from '@mdi/react';
import { mdiShopping } from '@mdi/js';

function NavBar() {
  const {cart, isCartOpen, setIsCartOpen} = useContext(CartContext);

  function getCartCount() {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <>
      <div id="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
        <div className="cart-icon" onClick={toggleCart}>
          <div>items in cart: {getCartCount()}</div>
          <Icon path={mdiShopping} size={2} />
        </div>
      </div>
    </>
  )
}

export default NavBar