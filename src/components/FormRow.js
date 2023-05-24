import React from 'react';

const FormRow = ({ type, name, value, handleChange, labelText, disabled }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        {...(disabled ? { disabled: true } : {})}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
