import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = props => {
  const { name, value, errorinfo, onChange, options } = props;
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={`form-control form-control-lg ${errorinfo && "is-invalid"}`}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      >
        {selectOptions}
      </select>
      {errorinfo && <div className="invalid-feedback">{errorinfo}</div>}
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
