import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function OptionSelector(props) {
  const [selected, setSelected] = useState(props.default);

  function handleChange(e) {
    setSelected(e.target.value);
    props.filter(e.target.value);
  }

  useEffect(() => {
    props.filter(selected);
  });

  return (
    <>
      <label htmlFor="props.name">{props.name}</label>
      <select
        onChange={handleChange}
        value={selected}
        id={props.name}
        name={props.name}
      >
        {props.options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}

OptionSelector.propTypes = {
  name: PropTypes.string,
  default: PropTypes.string,
  options: PropTypes.array,
  filter: PropTypes.func,
};

export default OptionSelector;
