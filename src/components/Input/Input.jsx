import React from "react";
import Classes from "./Input.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ type, placeholder, name, label, value, onChange, error }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={Classes.container}>
      <label htmlFor={name}>{label}</label>
      <div className={Classes.input_wrapper}>
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? Classes.input_error : ""}
        />
        {type === "password" &&
          (showPassword ? (
            <AiOutlineEye
              className={Classes.password_icon}
              onClick={toggleShowPassword}
            />
          ) : (
            <AiOutlineEyeInvisible
              className={Classes.password_icon}
              onClick={toggleShowPassword}
            />
          ))}
      </div>
      {error && <span className={Classes.error_message}>{error}</span>}
    </div>
  );
};

export default Input;
