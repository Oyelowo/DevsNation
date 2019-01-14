import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = props => {
  const { name, value, info, onChange, options } = props;
  const selectOptions = options.map((option, i) => {
    const defaultSelected = i === 0;
    return (
      <option
        key={option.label}
        disabled={defaultSelected}
        selected={defaultSelected}
        value={option.value}
      >
        {option.label}
      </option>
    );
  });
  return (
    <div className="form-group">
      <select
        className={`form-control form-control-lg`}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      >
        {selectOptions}
      </select>
      <small>{info}</small>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
