// React dependencies
import { Fragment, useContext } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// External dependencies
import PropTypes from 'prop-types';

// Components
import Input from '../inputs/Input';
import Icon from '@mdi/react';

// Contexts
import { CartContext } from '../../App';

// Assets
import { mdiDelete, mdiCloseCircle } from '@mdi/js';

// Styles
import styles from './Cart.module.css';

function Cart(props) {
  const { isCartOpen, setIsCartOpen, toggleCart } = useContext(CartContext);
  const navigate = useNavigate();

  function handleClickDelete(id) {
    props.deleteFromCart(id);
  }

  function calcTotal() {
    return parseFloat(
      props.cart
        ? props.cart
            .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
            .toFixed(2)
        : 0
    );
  }

  function handleClickDecrease(id) {
    props.handleAddToCart(id, -1);
  }

  function handleChange(id, quantity) {
    props.handleAddToCart(id, quantity, true);
  }

  function handleClickIncrease(id) {
    props.handleAddToCart(id, 1);
  }

  function checkout() {
    navigate('/order-confirm');
    localStorage.clear();
  }

  return (
    <div className={styles.cart}>
      <div className={styles.closeCart} onClick={toggleCart}><Icon path={mdiCloseCircle} size={1} />
</div>
      <h1>Your Cart!</h1>
      {calcTotal() === 0 && <p>There are no items in cart.</p>}
      {props.cart &&
        props.cart.map((product) => (
          <Fragment key={product.id}>
            <div className={styles.product}>
              <h5 className={styles.title}>{product.title}</h5>
              <div className={styles.imgContainer}>
                <img className={styles.img} src={product.image} alt="" />
              </div>
              <p className={styles.price}>{product.price}</p>
              <Input
                id={product.id}
                className={styles.quantity}
                quantity={product.quantity}
                handleClickDecrease={handleClickDecrease}
                handleClickIncrease={handleClickIncrease}
                handleChange={handleChange}
              ></Input>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  handleClickDelete(product.id);
                }}
              >
                <Icon path={mdiDelete} size={1} />
              </button>
            </div>
            <hr className={styles.hr}></hr>
          </Fragment>
        ))}
      {calcTotal() === 0 && <hr className={styles.hr}></hr>}
      <h6>total price: {calcTotal()}</h6>

      {calcTotal() > 0 ? (
        <button className={styles.checkoutBtn} onClick={checkout}>
          Checkout
        </button>
      ) : (
        <button className={styles.checkoutBtn} disabled>
          Checkout
        </button>
      )}
    </div>
  );
}

Cart.propTypes = {
  slideOutReady: PropTypes.bool,
  cart: PropTypes.array,
  deleteFromCart: PropTypes.func,
  handleAddToCart: PropTypes.func,
};

export default Cart;
