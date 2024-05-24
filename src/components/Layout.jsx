import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

export default function Layout({ authUser, signOut }) {
  return (
    <div>
      {!authUser ? (
        <div data-testid="outlet">
          <Outlet />
        </div>
      ) : (
        <div>
          <Navbar authUser={authUser} signOut={signOut} />
          <div data-testid="outlet">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

Layout.propTypes = {
  authUser: PropTypes.shape({}),
  signOut: PropTypes.func,
};
