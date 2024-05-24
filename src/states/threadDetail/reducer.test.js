/**
 * test scenario for threadDetailReducer
 *
 * threadDetailReducer function:
 * 1. should return the initial threadDetail when given by unknown action
 * 2. should return the threadDetail when given by RECEIVE_THREAD_DETAIL action
 * 3. should return null when given by CLEAR_THREAD_DETAIL action
 * 4. should return the threadDetail with the new comment when given by REPLY_COMMENT action
 * 5. should return the threadDetail with the upVotes updated when given by UP_VOTE_DETAIL
 *    and UP_VOTE_COMMENT action
 * 6. should return the threadDetail with the downVotes updated when given by DOWN_VOTE_DETAIL
 *    and DOWN_VOTE_COMMENT action
 * 7. should return the threadDetail with the votes neutralized when given by NEUTRAL_VOTE_DETAIL
 *    and NEUTRAL_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

const dummyThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer function', () => {
  it('should return the initial threadDetail when given by unknown action', () => {
    // Arrange
    const threadDetail = null;
    const action = { type: 'UNKNOWN' };

    // Act
    const result = threadDetailReducer(threadDetail, action);

    // Assert
    expect(result).toEqual(threadDetail);
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // Arrange
    const threadDetail = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: { detailThread: dummyThreadDetail },
    };

    // Act
    const result = threadDetailReducer(threadDetail, action);

    // Assert
    expect(result).toEqual(action.payload.detailThread);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // Arrange
    const threadDetail = dummyThreadDetail;
    const action = { type: 'CLEAR_THREAD_DETAIL' };

    // Act
    const result = threadDetailReducer(threadDetail, action);

    // Assert
    expect(result).toEqual(null);
  });

  it('should return the threadDetail with the new comment when given by REPLY_COMMENT action', () => {
    // Arrange
    const threadDetail = dummyThreadDetail;
    const action = {
      type: 'REPLY_COMMENT',
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-06-21T08:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-2',
            name: 'Jane Doe',
            avatar: 'https://generated-image-url.jpg',
          },
        },
      },
    };

    // Act
    const result = threadDetailReducer(threadDetail, action);

    // Assert
    expect(result).toEqual({
      ...threadDetail,
      comments: [...threadDetail.comments, action.payload.comment],
    });
  });

  it('should return the threadDetail with the upVotes updated when given by UP_VOTE_DETAIL and UP_VOTE_COMMENT action', () => {
    // Arrange
    const threadDetail = dummyThreadDetail;
    const actionDetail = {
      type: 'UP_VOTE_DETAIL',
      payload: { userId: 'users-1' },
    };
    const actionComment = {
      type: 'UP_VOTE_COMMENT',
      payload: { userId: 'users-1', commentId: 'comment-1' },
    };

    // Act
    const resultDetail = threadDetailReducer(threadDetail, actionDetail);
    const resultComment = threadDetailReducer(resultDetail, actionComment);

    // Assert
    expect(resultDetail).toEqual({
      ...threadDetail,
      upVotesBy: [actionDetail.payload.userId],
    });

    expect(resultComment).toEqual({
      ...resultDetail,
      comments: [
        {
          ...resultDetail.comments[0],
          upVotesBy: [actionComment.payload.userId],
        },
      ],
    });
  });

  it('should return the threadDetail with the downVotes updated when given by DOWN_VOTE_DETAIL and DOWN_VOTE_COMMENT action', () => {
    // Arrange
    const threadDetail = dummyThreadDetail;
    const actionDetail = {
      type: 'DOWN_VOTE_DETAIL',
      payload: { userId: 'users-1' },
    };
    const actionComment = {
      type: 'DOWN_VOTE_COMMENT',
      payload: { userId: 'users-1', commentId: 'comment-1' },
    };

    // Act
    const resultDetail = threadDetailReducer(threadDetail, actionDetail);
    const resultComment = threadDetailReducer(resultDetail, actionComment);

    // Assert
    expect(resultDetail).toEqual({
      ...threadDetail,
      downVotesBy: [actionDetail.payload.userId],
    });

    expect(resultComment).toEqual({
      ...resultDetail,
      comments: [
        {
          ...resultDetail.comments[0],
          downVotesBy: [actionComment.payload.userId],
        },
      ],
    });
  });

  it('should return the threadDetail with the votes neutralized when given by NEUTRAL_VOTE_DETAIL and NEUTRAL_VOTE_COMMENT action', () => {
    // Arrange
    const threadDetail = dummyThreadDetail;
    const actionDetail = {
      type: 'NEUTRAL_VOTE_DETAIL',
      payload: { userId: 'users-1' },
    };
    const actionComment = {
      type: 'NEUTRAL_VOTE_COMMENT',
      payload: { userId: 'users-1', commentId: 'comment-1' },
    };

    // Act
    const resultDetail = threadDetailReducer(threadDetail, actionDetail);
    const resultComment = threadDetailReducer(resultDetail, actionComment);

    // Assert
    expect(resultDetail).toEqual({
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: [],
    });

    expect(resultComment).toEqual({
      ...resultDetail,
      comments: [
        {
          ...resultDetail.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});
