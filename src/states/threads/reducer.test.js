/**
 * test scenario for threadReducer
 *
 * threadReducer function
 * 1. should return the initial threads when given by unknown action
 * 2. should return the threads when given by RECEIVE_THREADS action
 * 3. should return the threads with the new thread when given by ADD_THREAD action
 * 4. should return the threads with the upVotes updated when given by UP_VOTE_THREAD action
 * 5. should return the threads with the downVotes updated when given by DOWN_VOTE_THREAD action
 * 6. should return the threads with the votes neutralized when given by NEUTRAL_VOTE_THREAD action
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadReducer function', () => {
  it('should return the initial threads when given by unknown action', () => {
    // Arrange
    const threads = [];
    const action = { type: 'UNKNOWN' };

    // Act
    const result = threadsReducer(threads, action);

    // Assert
    expect(result).toEqual(threads);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // Arrange
    const threads = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // Act
    const result = threadsReducer(threads, action);

    // Assert
    expect(result).toEqual(action.payload.threads);
  });

  it('should return the threads with a new thread when given by ADD_THREAD action', () => {
    // Arrange
    const threads = [{
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    }];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T08:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // Act
    const result = threadsReducer(threads, action);

    // Assert
    expect(result).toEqual([action.payload.thread, ...threads]);
  });

  it('should return the threads with the upVotes updated when given by UP_VOTE_THREAD action', () => {
    // Arrange
    const threads = [{
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    }];

    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // Act
    const result = threadsReducer(threads, action);

    // Assert
    expect(result).toEqual([{
      ...threads[0],
      upVotesBy: [action.payload.userId],
    }]);
  });

  it('should return the threads with the downVotes updated when given by DOWN_VOTE_THREAD action', () => {
    // Arrange
    const threads = [{
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    }];

    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // Act
    const result = threadsReducer(threads, action);

    // Assert
    expect(result).toEqual([{
      ...threads[0],
      downVotesBy: [action.payload.userId],
    }]);
  });

  it('should return the threads with the votes neutralized when given by NEUTRAL_VOTE_THREAD action', () => {
    // Arrange
    const threads = [{
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: ['users-1'],
      downVotesBy: ['users-2'],
      totalComments: 0,
    }];

    const action = {
      type: 'NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // Act
    const result = threadsReducer(threads, action);

    // Assert
    expect(result).toEqual([{
      ...threads[0],
      upVotesBy: [],
      downVotesBy: ['users-2'],
    }]);
  });
});
