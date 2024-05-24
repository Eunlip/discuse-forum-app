/* eslint-disable no-underscore-dangle */
/**
 * Test scenario for asyncFetchFilteredThreads
 *
 * asyncFetchFilteredThreads thunk:
 * 1. should dispatch action correctly when data fetching and filtering is successful
 * 2. should dispatch action and call alert when data fetching and filtering failed
 */

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncFetchFilteredThreads, filterThreadsActionCreator } from './action';

const fakeThreadsResponse = [
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
  {
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
];

const fakeErrorResponse = new Error('Failed to fetch data');

describe('asyncFetchFilteredThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching and filtering is successful', async () => {
    // Arrange
    api.getAllThreads = vi.fn().mockResolvedValue(fakeThreadsResponse);

    const dispatch = vi.fn();
    const keyword = 'Pertama';
    const fakeFilteredThreadsResponse = fakeThreadsResponse.filter(
      (thread) => thread.title.includes(keyword),
    );
    // Act
    await asyncFetchFilteredThreads(keyword)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(filterThreadsActionCreator(fakeFilteredThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching and filtering failed', async () => {
    // Arrange
    api.getAllThreads = vi.fn().mockRejectedValue(new Error('Failed to fetch data'));

    const dispatch = vi.fn();
    const keyword = 'Pertama';
    window.alert = vi.fn();

    // Act
    await asyncFetchFilteredThreads(keyword)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
