import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { filterThreads } from '../../utils';

const ActionType = {
  FILTER_THREADS: 'FILTER_THREADS',
};

function filterThreadsActionCreator(threads) {
  return {
    type: ActionType.FILTER_THREADS,
    payload: { threads },
  };
}

// thunk function
function asyncFetchFilteredThreads(keyword) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.getAllThreads();
      const filteredThreads = filterThreads(response, keyword);
      dispatch(filterThreadsActionCreator(filteredThreads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, filterThreadsActionCreator, asyncFetchFilteredThreads };
