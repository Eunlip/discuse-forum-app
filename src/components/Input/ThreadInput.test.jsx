/**
 * test scenario for ThreadInput Component
 *
 * ThreadInput Component:
 * 1. should handle title change correctly
 * 2. should handle category change correctly
 * 3. should handle body change correctly
 * 4. createThread should be called when form is submitted
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle title change correctly', async () => {
    // Arrange
    render(<ThreadInput />);
    const titleInput = screen.getByTestId('title-input');
    // Act
    await userEvent.type(titleInput, 'Belajar React Redux');
    // Assert
    expect(titleInput.value).toBe('Belajar React Redux');
  });

  it('should handle category change correctly', async () => {
    // Arrange
    render(<ThreadInput />);
    const categoryInput = screen.getByTestId('category-input');
    // Act
    await userEvent.type(categoryInput, 'React');
    // Assert
    expect(categoryInput.value).toBe('React');
  });

  it('should handle body change correctly', async () => {
    // Arrange
    render(<ThreadInput />);
    const bodyInput = screen.getByTestId('body-input');
    // Act
    await userEvent.type(bodyInput, 'Mari kita belajar react redux bersama sama dengan cara yang lebih sederhana');
    // Assert
    expect(bodyInput.value).toBe('Mari kita belajar react redux bersama sama dengan cara yang lebih sederhana');
  });

  it('createThread should be called when form is submitted', async () => {
    // Arrange
    const mockCreateThread = vi.fn();
    render(<ThreadInput createThread={mockCreateThread} />);
    const titleInput = screen.getByTestId('title-input');
    await userEvent.type(titleInput, 'Belajar React Redux');
    const categoryInput = screen.getByTestId('category-input');
    await userEvent.type(categoryInput, 'React');
    const bodyInput = screen.getByTestId('body-input');
    await userEvent.type(bodyInput, 'Mari kita belajar react redux bersama sama dengan cara yang lebih sederhana');
    const createButton = screen.getByRole('button', { name: /create/i });
    // Act
    await userEvent.click(createButton);
    // Assert
    expect(mockCreateThread).toHaveBeenCalledWith({
      title: 'Belajar React Redux',
      category: 'React',
      body: 'Mari kita belajar react redux bersama sama dengan cara yang lebih sederhana',
    });
  });
});
