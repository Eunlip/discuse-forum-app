import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

export default function index() {
  return (
    <div data-testid="loading-bar" className="sticky top-0 z-50">
      <LoadingBar />
    </div>
  );
}
