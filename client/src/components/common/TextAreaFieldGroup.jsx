import React from "react";
import PropTypes from "prop-types";

const TextAreaFieldGroup = props => {
  const { name, value, errorinfo, onChange } = props;
  return (
    <div className="form-group">
      <textarea
        className={`form-control form-control-lg ${errorinfo && "is-invalid"}`}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      />
      {errorinfo && <div className="invalid-feedback">{errorinfo}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
