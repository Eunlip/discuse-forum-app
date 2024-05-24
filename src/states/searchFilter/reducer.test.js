/**
 * test scenario for searchFilterReducer
 *
 * searchFilterReducer function:
 * 1. should return the initial searchFilter when given by unknown action
 * 2. should return the searchFilter when given by FILTER_THREADS action
 */

import { describe, it, expect } from 'vitest';
import searchFilterReducer from './reducer';

describe('searchFilterReducer function', () => {
  it('should return the initial searchFilter when given by unknown action', () => {
    // Arrange
    const searchFilter = { threads: [] };
    const action = { type: 'UNKNOWN' };

    // Act
    const result = searchFilterReducer(searchFilter, action);

    // Assert
    expect(result).toEqual(searchFilter);
  });

  it('should return the searchFilter when given by FILTER_THREADS action', () => {
    // Arrange
    const searchFilter = { threads: [] };
    const action = {
      type: 'FILTER_THREADS',
      payload: { threads: [{ id: 'thread-1', title: 'Thread 1' }] },
    };

    // Act
    const result = searchFilterReducer(searchFilter, action);

    // Assert
    expect(result).toEqual({ threads: [{ id: 'thread-1', title: 'Thread 1' }] });
  });
});
