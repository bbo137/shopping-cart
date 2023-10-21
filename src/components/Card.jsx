import PropTypes from 'prop-types';
import Input from './Input';

function Card(props) {
  function handleClick() {
    props.handleAddToCart(props.id, props.quantity);
  }

  function handleClickDecrease(id) {
    props.handleQuantity(id, -1);
  }

  function handleChange(id, quantity) {
    props.handleQuantity(id, quantity, true);
  }

  function handleClickIncrease(id) {
    props.handleQuantity(id, 1);
  }

  return (
    <>
      <h1>{props.title}</h1>
      <img src={props.img} style={{ height: 20 + '%', width: 20 + '%' }}></img>
      <p>{props.desc}</p>
      <div>
        <div className="price">{props.price}</div>
        <Input
          id={props.id}
          quantity={props.quantity}
          handleClickDecrease={handleClickDecrease}
          handleClickIncrease={handleClickIncrease}
          handleChange={handleChange}
        ></Input>
        <button onClick={handleClick}>add to cart</button>
      </div>
    </>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  img: PropTypes.string,
  desc: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.number,
  handleAddToCart: PropTypes.func,
  handleQuantity: PropTypes.func,
};

export default Card;
