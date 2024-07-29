import React, { useState } from "react";

const Input = ({
  label,
  required,
  error,
  renderInput,
  widthStyle,
  ...restProps
}) => {
  return (
    <div className="form-group" style={widthStyle}>
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...restProps, error }) || (
        <input
          type="text"
          className={`form__input ${error ? "formerror" : ""}`}
          {...restProps}
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
