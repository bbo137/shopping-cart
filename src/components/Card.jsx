import PropTypes from 'prop-types'

function Card(props) {
  function handleClick() {
    props.handleAddToCart(props.id, 1);
  }

  return (
    <>
      <h1>{props.title}</h1>
      <img src={props.img} style={{height: 20+'%', width: 20+'%'}}></img>
      <p>{props.desc}</p>
      <div>
        <div className="price">{props.price}</div>
        <button onClick={handleClick}>add to cart</button>
      </div>
    </>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  img: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.number,
  handleAddToCart: PropTypes.func,
}

export default Card