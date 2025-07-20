import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PostSongs from './PostSongs';
import songsReducer from '../../features/songs/songsSlice';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the react-toastify module
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock the react-icons modules
jest.mock('react-icons/fa', () => ({
  FaMusic: () => <div>FaMusic</div>,
  FaUserAlt: () => <div>FaUserAlt</div>,
  // Add other icons as needed
}));

describe('PostSongs Component', () => {
  const mockStore = configureStore({
    reducer: {
      songs: songsReducer
    }
  });

  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <Router>
          <PostSongs />
        </Router>
      </Provider>
    );
  };

  test('renders the form with all fields', () => {
    renderComponent();
    
    expect(screen.getByText('Add New Track')).toBeInTheDocument();
    expect(screen.getByLabelText('Track Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Artist/Band')).toBeInTheDocument();
    expect(screen.getByLabelText('Album')).toBeInTheDocument();
    expect(screen.getByLabelText('Release Year')).toBeInTheDocument();
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByLabelText('duration length')).toBeInTheDocument();
    expect(screen.getByText('Add to Library')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderComponent();
    
    const submitButton = screen.getByText('Add to Library');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Track Title')).toHaveAttribute('required');
      expect(screen.getByLabelText('Artist/Band')).toHaveAttribute('required');
    });
  });

  test('submits the form with valid data', async () => {
    renderComponent();
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Track Title'), { target: { value: 'New Song' } });
    fireEvent.change(screen.getByLabelText('Artist/Band'), { target: { value: 'New Artist' } });
    fireEvent.change(screen.getByLabelText('Album'), { target: { value: 'New Album' } });
    fireEvent.change(screen.getByLabelText('Release Year'), { target: { value: '2023' } });
    fireEvent.change(screen.getByLabelText('Genre'), { target: { value: 'Pop' } });
    fireEvent.change(screen.getByLabelText('duration length'), { target: { value: '3:30' } });
    
    const submitButton = screen.getByText('Add to Library');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'songs/createSongRequest/pending'
        })
      );
    });
  });

  test('navigates after successful submission', async () => {
    // Mock a successful submission
    const mockSuccessStore = configureStore({
      reducer: {
        songs: songsReducer
      }
    });
    
    mockSuccessStore.dispatch = jest.fn().mockResolvedValueOnce({});
    
    render(
      <Provider store={mockSuccessStore}>
        <Router>
          <PostSongs />
        </Router>
      </Provider>
    );
    
    // Fill out required fields
    fireEvent.change(screen.getByLabelText('Track Title'), { target: { value: 'New Song' } });
    fireEvent.change(screen.getByLabelText('Artist/Band'), { target: { value: 'New Artist' } });
    
    const submitButton = screen.getByText('Add to Library');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/songs');
    });
  });
});