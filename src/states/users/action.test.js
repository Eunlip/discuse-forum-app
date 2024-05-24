/* eslint-disable no-underscore-dangle */
/**
 * test scenario for asyncRegisterUser
 *
 * asyncRegisterUser thunk:
 * 1. should dispatch action correctly when registering user is success
 * 2. should dispatch action and call alert when registering user is failed
 */

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeUserResponse = {
  name: 'Jane Doe',
  email: 'janedoe@example.com',
  password: 'janedoe123',
};

const fakeErrorResponse = new Error('Error registering user');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
  });

  it('should dispatch action correctly when registering user is success', async () => {
    // Arrange
    api.register = vi.fn().mockResolvedValue();

    const dispatch = vi.fn();

    // Act
    await asyncRegisterUser(fakeUserResponse)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when registering user is failed', async () => {
    // Arrange
    api.register = vi.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // Act
    await asyncRegisterUser(fakeUserResponse)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
