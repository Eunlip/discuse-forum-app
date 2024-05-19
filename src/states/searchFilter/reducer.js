import { ActionType } from './action';

const initialState = {
  threads: [],
};

function searchFilterReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.FILTER_THREADS:
      return {
        ...state,
        threads: action.payload.threads || [],
      };
    default:
      return state;
  }
}

export default searchFilterReducer;
