import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';
import {
  ThreadsPage,
  LoginPage,
  RegisterPage,
  Error404,
} from './pages';
import LeaderboardsPage from './pages/LeaderboardsPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import DetailThread from './pages/DetailThreadPage';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();
  const { authUser, isPreload } = useSelector((state) => ({
    authUser: state.authUser || null,
    isPreload: state.isPreload || false,
  }));

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <Routes>
        {
          !authUser ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          ) : (
            <Route path="/" element={<Layout authUser={authUser} signOut={onSignOut} />}>
              <Route index element={<ThreadsPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
              <Route path="/threads/:id" element={<DetailThread />} />
            </Route>
          )
        }
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
