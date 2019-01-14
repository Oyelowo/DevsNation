import React from "react";
import PropTypes from "prop-types";

const InputGroup = props => {
  const { name, value, onChange, icon, errorinfo } = props;
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
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

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
