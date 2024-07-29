import React from "react";

const Select = ({ options, error, ...restProps }) => {
  return (
    <select
      className={`form__input ${error ? "formerror" : ""}`}
      {...restProps}
    >
      {options?.map((option, index) => (
        <option key={option?.value || index} value={option?.value}>
          {option?.label || ""}
        </option>
      ))}
    </select>
  );
};

export default Select;
