import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Button,
  IconButton,
  Collapse,
  Typography,
  Avatar,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import IconThreads from '../../assets/images/Chat.svg';
import IconLeaderboard from '../../assets/images/Leaderboard.svg';
import Logo from '../../assets/images/Logo.svg';

export default function Index({ authUser, signOut }) {
  const [openNav, setOpenNav] = useState(false);
  const { id, avatar, name } = authUser || { id: '', avatar: '', name: '' };
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="flex flex-col gap-5 mb-4 mt-7 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className={`flex gap-[2px] w-fit lg:w-auto text-xl text-outerSpace  ${location.pathname === '/' ? 'border-b-2 font-semibold border-yankeesBlue' : ''}`}>
        <img src={IconThreads} alt="icon" className="w-8" />
        <NavLink to="/" className="flex items-center">Threads</NavLink>
      </li>
      <li className={`flex gap-2 text-xl w-fit text-outerSpace  ${location.pathname === '/leaderboards' ? 'border-b-2 font-semibold border-yankeesBlue' : ''}`}>
        <img src={IconLeaderboard} alt="icon" className="w-8" />
        <NavLink to="/leaderboards" className="flex items-center">Leaderboards</NavLink>
      </li>
    </ul>
  );

  const authButtons = (
    <div className="items-center hidden container-nav lg:flex">
      <div className="flex items-center gap-2 mr-5">
        <Avatar src={avatar} size="sm" alt={id} title={name} />
        <Typography className="text-xl text-outerSpace">{name}</Typography>
      </div>
      <Link to="/">
        <IoIosLogOut
          className="hidden text-2xl capitalize cursor-pointer text-outerSpace bg-inherit hover:text-opacity-90 lg:block"
          onClick={signOut}
          title="Logout"
        />
      </Link>
    </div>
  );

  return (
    <Navbar className="fixed top-0 z-10 max-w-full p-4 border-gray-100 border-none rounded-none nav bg-blue-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 lg:px-16 lg:py-7">
      <div className="flex items-center justify-between mx-auto max-w-screen-2xl text-blue-gray-900">
        <img src={Logo} alt="Logo" />
        <div className="flex items-center justify-start gap-10">
          <div className="hidden lg:block">{navList}</div>
          {authButtons}
          <IconButton
            variant="text"
            className="w-6 h-6 ml-auto hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        {authUser ? (
          <div className="flex items-center mt-5 text-xl">
            <div className="flex items-center gap-2 mr-3">
              <Avatar src={avatar} size="sm" alt={id} title={name} />
              <Typography className="text-xl font-medium text-outerSpace">{name}</Typography>
            </div>
            <IoIosLogOut
              className="text-2xl font-medium capitalize cursor-pointer text-outerSpace bg-inherit hover:text-opacity-90 lg:block"
              onClick={signOut}
              title="Logout"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 lg:hidden">
            <Button fullWidth variant="filled" size="md" className="text-sm font-medium capitalize border text-bussYellow bg-yankeesBlue border-mustardYellow">
              <Link to="/login">Login</Link>
            </Button>
            <Button fullWidth variant="filled" size="md" className="text-sm font-medium capitalize bg-bussYellow text-yankeesBlue">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Index.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};
