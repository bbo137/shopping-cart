import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import styles from './Input.module.css'

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
    <div>
      <label className={styles.label} htmlFor="props.name">{props.name}</label>
      <select
        id={props.name}
        className={styles.selectInput}
        onChange={handleChange}
        value={selected}
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
    </div>
  );
}

OptionSelector.propTypes = {
  name: PropTypes.string,
  default: PropTypes.string,
  options: PropTypes.array,
  filter: PropTypes.func,
};

export default OptionSelector;
