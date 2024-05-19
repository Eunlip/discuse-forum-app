import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  REPLY_COMMENT: 'REPLY_COMMENT',
  UP_VOTE_DETAIL: 'UP_VOTE_DETAIL',
  DOWN_VOTE_DETAIL: 'DOWN_VOTE_DETAIL',
  NEUTRAL_VOTE_DETAIL: 'NEUTRAL_VOTE_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(detailThread, message) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { detailThread, message },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function replyCommentActionCreator(comment) {
  return {
    type: ActionType.REPLY_COMMENT,
    payload: { comment },
  };
}

function upVoteDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_DETAIL,
    payload: { userId },
  };
}

function downVoteDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL,
    payload: { userId },
  };
}

function neutralVoteDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL,
    payload: { userId },
  };
}

function upVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: { threadId, commentId, userId },
  };
}

function downVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: { threadId, commentId, userId },
  };
}

function neutralVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: { threadId, commentId, userId },
  };
}

// thunk function
function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert('thread tidak ditemukan');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncReplyComment({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ id, content });
      dispatch(replyCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(upVoteDetailActionCreator(authUser.id));

    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(downVoteDetailActionCreator(authUser.id));

    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(neutralVoteDetailActionCreator(authUser.id));

    try {
      await api.neutralVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(commentId, userId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail } = getState();

    try {
      await api.upVoteComment(threadDetail.id, commentId);
      dispatch(upVoteCommentActionCreator(threadDetail.id, commentId, userId));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(commentId, userId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail } = getState();

    try {
      await api.downVoteComment(threadDetail.id, commentId);
      dispatch(downVoteCommentActionCreator(threadDetail.id, commentId, userId));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment(commentId, userId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail } = getState();

    try {
      await api.neutralVoteComment(threadDetail.id, commentId);
      dispatch(neutralVoteCommentActionCreator(threadDetail.id, commentId, userId));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  replyCommentActionCreator,
  upVoteDetailActionCreator,
  downVoteDetailActionCreator,
  neutralVoteDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncReplyComment,
  asyncUpVoteDetail,
  asyncDownVoteDetail,
  asyncNeutralVoteDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};
