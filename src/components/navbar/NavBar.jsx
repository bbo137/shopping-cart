// React dependencies
import { useContext } from 'react';

// Router
import { Link, useNavigate } from 'react-router-dom';

// Contexts
import { CartContext } from '../../App';

// Components
import Icon from '@mdi/react';

// Assets
import logo from "../../assets/_36edad14-49e3-41b6-baae-c4b291d3ec86.jpeg";
import { mdiShopping } from '@mdi/js';

// Styles
import styles from './Navbar.module.css';

function NavBar() {
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, toggleCart } =
    useContext(CartContext);

  function getCartCount() {
    return cart ? cart.reduce((acc, curr) => acc + curr.quantity, 0) : 0;
  }

  return (
    <>
      <div id={styles.navBar}>
        <div className={styles.titleContainer} onClick={() => {navigate("/home")}}>
          <div className={styles.imgContainer}>
            <img className={styles.img} src={logo} alt="" />
          </div>
          <h1 className={styles.title}>Foren</h1>
        </div>
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
        <div className={styles.cartIcon} onClick={toggleCart}>
          <div className={styles.count}>{getCartCount()}</div>
          <Icon path={mdiShopping} size={2.5} />
        </div>
      </div>
    </>
  );
}

export default NavBar;
