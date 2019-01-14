import React from "react";
import PropTypes from "prop-types";

const TextAreaFieldGroup = props => {
  const { name, value, info, onChange } = props;
  return (
    <div className="form-group">
      <textarea
        className={`form-control form-control-lg`}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      />
      <small >{info}</small>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
