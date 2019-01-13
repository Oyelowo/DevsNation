import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = props => {
  const { name, value, errorinfo, type, onChange } = props;
  return (
    <div className="form-group">
      <input
        className={`form-control form-control-lg ${errorinfo && "is-invalid"}`}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        {...props}
      />
      {errorinfo && <div className="invalid-feedback">{errorinfo}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
