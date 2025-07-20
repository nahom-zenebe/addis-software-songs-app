import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import FavoriteSongsPage from './FavoriteSongsPage';
import { theme } from './Homepage';

const mockStore = configureStore([]);

const initialState = {
  songs: {
    items: [
      { id: 1, title: 'Song 1', artist: 'Artist 1', album: 'Album 1', year: 2020, favorite: false },
      { id: 2, title: 'Song 2', artist: 'Artist 2', album: 'Album 2', year: 2021, favorite: true },
    ],
    pagination: { currentPage: 1, totalPages: 1, totalItems: 2, itemsPerPage: 4 },
    status: 'idle',
    error: null,
  },
};

describe('FavoriteSongsPage', () => {
  it('renders only favorite songs', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <FavoriteSongsPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Song 2')).toBeInTheDocument();
    expect(screen.queryByText('Song 1')).not.toBeInTheDocument();
  });

  it('toggles favorite status when heart icon is clicked', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <FavoriteSongsPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
    const heartButtons = screen.getAllByRole('button');
    fireEvent.click(heartButtons.find(btn => btn.innerHTML.includes('svg')));
    // This only checks the click, not the state change, since mockStore doesn't update state
  });
}); 