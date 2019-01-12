import React from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <input
        className={`form-control form-control-lg ${props.errorfield &&
          "is-invalid"}`}
        {...props}
        onChange={props.onChange}
      />
      {props.errorfield && <div className="invalid-feedback">{props.errorfield}</div>}
    </div>
  );
};

export default Input;
