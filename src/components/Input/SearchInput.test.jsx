/**
 * test scenario for searchInput component
 *
 * searchInput component:
 * 1. should handle search typing correctly
 * 2. should handle search change correctly
 */
import React, { useState } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('searchInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle search typing correctly', async () => {
    // Arrange
    function Wrapper() {
      const [search, setSearch] = useState('');
      return <SearchInput search={search} onSearchChange={setSearch} />;
    }
    render(<Wrapper />);
    const searchInput = screen.getByPlaceholderText('Search discussion...');
    // Act
    await userEvent.type(searchInput, 'test');
    // Assert
    expect(searchInput.value).toBe('test');
  });
  it('should handle search change correctly', async () => {
    // Arrange
    const handleSearchChange = vi.fn();
    function Wrapper() {
      const [search, setSearch] = useState('');
      const onSearchChange = (value) => {
        setSearch(value);
        handleSearchChange(value);
      };
      return <SearchInput search={search} onSearchChange={onSearchChange} />;
    }
    render(<Wrapper />);
    const searchInput = screen.getByPlaceholderText('Search discussion...');
    // Act
    await userEvent.type(searchInput, 'test');
    // Assert
    expect(handleSearchChange).toHaveBeenCalled();
  });
});
