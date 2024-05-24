import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

// thunk function
function asyncFetchLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(response));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncFetchLeaderboards, receiveLeaderboardsActionCreator, ActionType };
