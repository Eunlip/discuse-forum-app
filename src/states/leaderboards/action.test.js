/* eslint-disable no-underscore-dangle */
/**
 * test scenario for asyncFetchLeaderboards
 *
 * asyncFetchLeaderboards thunk:
 * 1. should dispatch action correctly when fetching leaderboards is success
 * 2. should dispatch action and call alert when leaderboards is failed
 */

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncFetchLeaderboards, receiveLeaderboardsActionCreator } from './action';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error('Error fetching leaderboards');

describe('asyncFetchLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when fetching leaderboards is success', async () => {
    // Arrange
    api.getLeaderboards = vi.fn().mockResolvedValue(fakeLeaderboardsResponse);

    const dispatch = vi.fn();
    // Act
    await asyncFetchLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when leaderboards is failed', async () => {
    // Arrange
    api.getLeaderboards = vi.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // Act
    await asyncFetchLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
