/* eslint-disable no-unused-expressions */
/**
 * test scenario for loading component
 *
 * Loading Component:
 * 1. should render correctly
 * 2. should render loading bar correctly
 */

import React from 'react';
import {
  afterEach,
  beforeEach,
  chai, describe, expect, it,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { configureStore } from '@reduxjs/toolkit';
import chaiDom from 'chai-dom';
import Loading from './index';

function mockStore(initialState = {}) {
  return configureStore({
    reducer: {
      loadingBar: loadingBarReducer,
    },
    preloadedState: initialState,
  });
}

chai.use(chaiDom);

describe('Loading component', () => {
  beforeEach(() => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <Loading />
      </Provider>,
    );
  });
  afterEach(() => {
    cleanup();
  });
  it('should render correctly', () => {
    // Arrange
    // Act
    const loadingBar = screen.getByTestId('loading-bar');
    // Assert
    expect(loadingBar).to.have.class('sticky');
    expect(loadingBar).to.have.class('top-0');
    expect(loadingBar).to.have.class('z-50');
  });

  it('should render loading bar correctly', () => {
    // Arrange
    // Act
    const loadingBar = screen.getByTestId('loading-bar');
    // Assert
    expect(loadingBar).to.exist;
  });
});
