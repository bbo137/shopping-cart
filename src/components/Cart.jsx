import PropTypes from 'prop-types';

function Cart(props) {
  function handleClickDelete(id) {
    props.deleteFromCart(id);
  }

  function calcTotal() {
    return parseFloat(
      props.cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    ).toFixed(2);
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
          <p>{product.quantity}</p>
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

Cart.propTypes = {};

export default Cart;
