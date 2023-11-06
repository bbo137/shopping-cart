// External dependencies
import PropTypes from 'prop-types';

// Styles
import styles from './Input.module.css';

function Input(props) {
  function handleClickDecrease() {
    props.handleClickDecrease(props.id);
  }

  function handleChange(e) {
    props.handleChange(props.id, Number(e.target.value));
  }

  function handleBlur(e) {
    if (Number(props.quantity) === 0 || e.target.value === '') {
      if (e.relatedTarget !== null && e.relatedTarget.className.includes('add'))
        return;
      props.handleChange(props.id, 1);
    } else {
      props.handleChange(props.id, Number(props.quantity));
    }
  }

  function handleFocus() {
    if (Number(props.quantity) === 0 || Number(props.quantity) === 1)
      props.handleChange(props.id, '');
  }

  function handleClickIncrease() {
    props.handleClickIncrease(props.id);
  }

  function handleBeforeInput(e) {
    if (/\D/g.test(e.data)) {
      e.preventDefault();
    }
  }

  return (
    <div className={`${props.className} ${styles.quantity}`}>
      <button onClick={handleClickDecrease} className={`${styles.btn} ${styles.reduce}`}>
        -
      </button>
      <input
        className={styles.input}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type="number"
        inputMode="numeric"
        onBeforeInput={handleBeforeInput}
        pattern="[0-9]*"
        min="0"
        value={props.quantity}
      ></input>
      <button onClick={handleClickIncrease} className={`${styles.btn} ${styles.add}`}>
        +
      </button>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClickDecrease: PropTypes.func,
  handleChange: PropTypes.func,
  handleClickIncrease: PropTypes.func,
};

export default Input;
