/* eslint-disable no-unused-expressions */
/**
 * Test scenario for Layout component
 *
 * Layout Component:
 * 1. When `authUser` is falsy, only the `Outlet` component should be rendered.
 * 2. When `authUser` is truthy, the `Navbar` and `Outlet` components should be rendered.
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach, chai, describe, expect, it, vi,
} from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import chaiDom from 'chai-dom';
import Layout from './Layout';

const fakeAuthUserResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

chai.use(chaiDom);

describe('Layout component', () => {
  const mockSignOut = vi.fn();

  afterEach(() => {
    cleanup();
  });

  it('When `authUser` is falsy, only the `Outlet` component should be rendered', () => {
    // Arrange
    render(<Layout authUser={null} signOut={mockSignOut} />);
    // Act
    // Assert
    expect(screen.queryByRole('navigation')).toBeNull();
    expect(screen.getByTestId('outlet')).to.exist;
  });

  it('When `authUser` is truthy, the `Navbar` and `Outlet` components should be rendered', () => {
    // Arrange
    const mockUseAuth = vi.fn().mockReturnValue({ user: fakeAuthUserResponse[0] });
    render(
      <Router>
        <Layout authUser={mockUseAuth().user} signOut={mockSignOut} />
      </Router>,
    );
    // Act
    // Assert
    expect(screen.getByRole('navigation')).to.exist;
    expect(screen.getByTestId('outlet')).to.exist;
  });
});
