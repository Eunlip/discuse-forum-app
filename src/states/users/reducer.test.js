/**
 * test scenario for usersReducer
 *
 * usersReducer function:
 * 1. should return the initial users when given by unknown action
 * 2. should return the users when given by RECEIVE_USERS action
 */

import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';

const dummyUsers = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'fulan',
    name: 'Si Fulan',
    email: 'fulan@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

describe('usersReducer function', () => {
  it('should return the initial users when given by unknown action', () => {
    // Arrange
    const users = [];
    const action = { type: 'UNKNOWN' };

    // Act
    const result = usersReducer(users, action);

    // Assert
    expect(result).toEqual(users);
  });

  it('should return the users when given by RECEIVE_USERS action', () => {
    // Arrange
    const users = dummyUsers;
    const action = { type: 'RECEIVE_USERS', payload: { users: dummyUsers } };

    // Act
    const result = usersReducer(users, action);

    // Assert
    expect(result).toEqual(users);
  });
});
