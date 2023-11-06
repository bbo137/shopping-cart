// External dependencies
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';

// React components
import Icon from '@mdi/react';
import Input from '../inputs/Input';

// Assets
import { mdiStar, mdiStarHalf, mdiCartOutline } from '@mdi/js';

// Styles
import styles from './Card.module.css';

function Card(props) {
  const {
    id,
    title,
    img,
    desc,
    rating,
    quantity,
    price,
    handleAddToCart,
    handleQuantity,
  } = props;

  const handleClick = () => {
    handleAddToCart(id, quantity);
  };

  const handleClickDecrease = () => {
    handleQuantity(id, -1);
  };

  const handleChange = (quantity) => {
    handleQuantity(id, quantity, true);
  };

  const handleClickIncrease = () => {
    handleQuantity(id, 1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.flexTitle}>
        <h2 className={styles.title}>{title}</h2>
        <img className={styles.img} src={img} alt={title} />
      </div>

      <div className={styles.flexContent}>
        <ShowMoreText
          lines={4}
          more="Show more"
          less="Show less"
          className={styles.description}
        >
          <p>{desc}</p>
        </ShowMoreText>

        <div>
          {[...Array(parseInt(rating.rate))].map((e, i) => (
            <Icon className={styles.icon} key={i} path={mdiStar} size={1} />
          ))}

          {rating.rate % 1 > 0.5 && (
            <Icon className={styles.StarIcons} path={mdiStarHalf} size={1} />
          )}

          <div className={styles.price}>{`$ ${price}`}</div>

          <Input
            id={id}
            className={styles.quantity}
            quantity={quantity}
            handleClickDecrease={handleClickDecrease}
            handleClickIncrease={handleClickIncrease}
            handleChange={handleChange}
          />
        </div>

        <button className={styles.btn} onClick={handleClick}>
        <Icon className={styles.cartIcon} path={mdiCartOutline} size={1} /> Add to cart
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  img: PropTypes.string,
  desc: PropTypes.string,
  rating: PropTypes.object,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.number,
  handleAddToCart: PropTypes.func,
  handleQuantity: PropTypes.func,
};

export default Card;
