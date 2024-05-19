import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../assets/images/Logo.svg';
import Illustration from '../assets/images/Illustration.svg';
import { LoginInput } from '../components/Input';
import { asyncSetAuthUser } from '../states/authUser/action';

export default function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="flex items-center h-screen">
      <div className="flex-1 hidden h-screen p-5 lg:block bg-yankeesBlue">
        <img src={Logo} className="p-3" alt="Logo" />
        <div className="flex justify-center">
          <img src={Illustration} alt="Illustration" />
        </div>
      </div>
      <div className="flex flex-col items-center flex-1">
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-wider text-yankeesBlue">Welcome Back!</h1>
            <p className="text-sonicSilver">Please login to your account</p>
          </div>
          <LoginInput login={onLogin} />
          <p className="text-sonicSilver">
            New User?
            {' '}
            <Link to="/register" className="font-semibold cursor-pointer text-outerSpace hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
