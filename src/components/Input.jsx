import PropTypes from 'prop-types';

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
    <>
      <button onClick={handleClickDecrease} className="button reduce">
        -
      </button>
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type="number"
        inputMode="numeric"
        onBeforeInput={handleBeforeInput}
        pattern="[0-9]*"
        min="0"
        value={props.quantity}
        style={{
          height: 1.5 + 'rem',
          width: 50 + 'px',
          WebkitAppearance: 'none',
        }}
      ></input>
      <button onClick={handleClickIncrease} className="button add">
        +
      </button>
    </>
  );
}

Input.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClickDecrease: PropTypes.func,
  handleChange: PropTypes.func,
  handleClickIncrease: PropTypes.func,
};

export default Input;
