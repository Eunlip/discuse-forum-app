import { ActionType } from './action';

function leaderboardsReducer(leaderboards = [], action = {}) {
  if (action.type === ActionType.RECEIVE_LEADERBOARDS) {
    return action.payload.leaderboards;
  }

  return leaderboards;
}

export default leaderboardsReducer;
