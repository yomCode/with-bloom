import React from "react";
import Classes from "./Input.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ type, placeholder, name, label, value, onChange, error }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-[100%] flex flex-col justify-center items-center gap-1'>
      <label htmlFor={name} className='self-start ml-[2.4rem]'>{label}</label>
      <div className='relative w-[100%] flex flex-col items-center'>
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
              className='absolute top-[30%] right-[10%]'
              onClick={toggleShowPassword}
            />
          ) : (
            <AiOutlineEyeInvisible
              className='absolute top-[30%] right-[10%]'
              onClick={toggleShowPassword}
            />
          ))}
      </div>
      {error && <p className='self-start text-[0.8rem] ml-[2.4rem] text-[red]'>{error}</p>}
    </div>
  );
};

export default Input;
