import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../component/theme';
import configureStore from 'redux-mock-store';
import Homepage from './Homepage';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

const initialState = {
  songs: {
    items: [
      { id: 1, title: 'Song A', artist: 'Artist 1', album: 'Album 1', year: 2020 },
      { id: 2, title: 'Song B', artist: 'Artist 2', album: 'Album 2', year: 2021 },
    ],
    status: 'succeeded',
    error: null,
  },
};

describe('Homepage', () => {
  it('renders the search bar and song list', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Homepage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByPlaceholderText(/search by title, artist, or album/i)).toBeInTheDocument();
    expect(screen.getByText(/song a/i)).toBeInTheDocument();
    expect(screen.getByText(/song b/i)).toBeInTheDocument();
  });

  it('filters songs by search input', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Homepage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'A' } });
    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.queryByText('Song B')).toBeNull();
  });
});
