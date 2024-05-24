/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { IoMdLock } from 'react-icons/io';
import { TbEye, TbEyeClosed, TbMailFilled } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import Button from '../Button';
import useInput from '../../hooks/useInput';

export default function RegisterInput({
  register, defaultName = '', defaultEmail = '', defaultPassword = '',
}) {
  const [name, onNameChange] = useInput(defaultName);
  const [email, onEmailChange] = useInput(defaultEmail);
  const [password, onPasswordChange] = useInput(defaultPassword);
  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="w-[22rem] sm:w-[25rem] mb-4 mt-10">
      <label htmlFor="name" className=" text-outerSpace">Username</label>
      <div className="relative mb-8">
        <FaUser className="absolute z-10 m-3 text-md left-3 top-4" />
        <input
          type="text"
          id="name"
          className="relative w-full p-3 mt-3 bg-white border rounded-md border-chineseWhite focus:bg-aliceBlue focus:outline-0 pl-14 text-yankeesBlue"
          value={name}
          onChange={onNameChange}
          autoComplete="username"
          placeholder="example"
        />
      </div>
      <label htmlFor="email" className=" text-outerSpace">Email Address</label>
      <div className="relative mb-8">
        <TbMailFilled className="absolute z-10 m-3 text-xl left-3 top-4" />
        <input
          type="email"
          id="email"
          className="relative w-full p-3 mt-3 bg-white border rounded-md border-chineseWhite focus:bg-aliceBlue focus:outline-0 pl-14 text-yankeesBlue"
          value={email}
          onChange={onEmailChange}
          autoComplete="email"
          placeholder="example@gmail.com"
        />
      </div>
      <label htmlFor="password" className="font-medium text-outerSpace">Password</label>
      <div className="relative mb-10">
        <IoMdLock className="absolute z-10 m-3 text-xl left-3 top-3.5" />
        <input
          type={showPassword ? 'password' : 'text'}
          id="password"
          className="relative w-full p-3 mt-3 text-base bg-white border rounded-md border-chineseWhite focus:bg-aliceBlue focus:outline-0 pl-14 text-yankeesBlue placeholder:absolute placeholder:top-4"
          value={password}
          onChange={onPasswordChange}
          autoComplete="current-password"
          placeholder="*******"
        />
        <button type="button" className="absolute top-0 bottom-0 right-0 flex mt-3 w-14 rounded-r-md bg-chineseWhite" onClick={toggleShowPassword}>
          {showPassword ? (
            <TbEyeClosed className="relative text-xl cursor-pointer left-[18px] text-sonicSilver top-[18px]" />
          ) : (
            <TbEye className="relative text-2xl cursor-pointer text-sonicSilver left-4 top-3.5" />
          )}
        </button>
      </div>
      <Button className="font-semibold text-white capitalize rounded-md bg-outerSpace text-md" onClick={() => register({ name, email, password })} fullWidth>Register</Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  defaultName: PropTypes.string,
  defaultEmail: PropTypes.string,
  defaultPassword: PropTypes.string,
};
