import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterInput } from '../components/Input';
import Logo from '../assets/images/Logo.svg';
import IllustrationFlip from '../assets/images/Illustration-flip.svg';
import { asyncRegisterUser } from '../states/users/action';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <div className="flex items-center h-screen">
      <div className="flex flex-col items-center flex-1">
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-wider text-yankeesBlue">Create an Account</h1>
            <p className="text-sonicSilver">Please register for an account first</p>
          </div>
          <RegisterInput register={onRegister} />
          <p className="text-sonicSilver">
            Have an account?
            {' '}
            <Link to="/" className="font-semibold cursor-pointer text-outerSpace hover:underline">Login</Link>
          </p>
        </div>
      </div>
      <div className="flex-1 hidden h-screen p-5 lg:block bg-yankeesBlue">
        <div className="flex justify-end">
          <img src={Logo} className="p-3 " alt="Logo" />
        </div>
        <div className="flex justify-center">
          <img src={IllustrationFlip} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}
