import PropTypes from 'prop-types';
import Input from './Input';

function Cart(props) {
  function handleClickDelete(id) {
    props.deleteFromCart(id);
  }

  function calcTotal() {
    return parseFloat(
      props.cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    ).toFixed(2);
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

  return (
    <>
      <h1>Cart component!</h1>
      {props.cart.map((product) => (
        <div key={product.id} className="product">
          <h5>{product.title}</h5>
          <img
            src={product.image}
            style={{ height: 5 + '%', width: 5 + '%' }}
            alt=""
          />
          <p>{product.price}</p>
          <Input
            id={product.id}
            quantity={product.quantity}
            handleClickDecrease={handleClickDecrease}
            handleClickIncrease={handleClickIncrease}
            handleChange={handleChange}
          ></Input>
          <button
            onClick={() => {
              handleClickDelete(product.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
      <h6>total price: {calcTotal()}</h6>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  deleteFromCart: PropTypes.func,
  handleAddToCart: PropTypes.func,
};

export default Cart;
