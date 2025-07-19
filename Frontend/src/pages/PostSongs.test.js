import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import PostSongs from './PostSongs';
import '@testing-library/jest-dom';
const mockStore = configureStore([]);
const store = mockStore({});

describe('PostSongs', () => {
  it('renders the form and allows input', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <PostSongs />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/artist/i)).toBeInTheDocument();
  });
});
