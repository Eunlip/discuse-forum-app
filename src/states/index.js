import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import searchFilterReducer from './searchFilter/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    threads: threadsReducer,
    leaderboards: leaderboardsReducer,
    searchFilter: searchFilterReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
