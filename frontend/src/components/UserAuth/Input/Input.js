import React from 'react';
import "./Input.css";

const Input = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} // Ensure this is passed down properly
    />
  );
};

export default Input;
