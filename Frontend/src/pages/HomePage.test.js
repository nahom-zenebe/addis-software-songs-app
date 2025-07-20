import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './Homepage';
import songsReducer from '../../features/songs/songsSlice';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the react-toastify module
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock the react-icons/fa module
jest.mock('react-icons/fa', () => ({
  FaEye: () => <div>FaEye</div>,
  FaEdit: () => <div>FaEdit</div>,
  FaTrash: () => <div>FaTrash</div>,
  FaPlus: () => <div>FaPlus</div>,
  FaSearch: () => <div>FaSearch</div>,
  FaMusic: () => <div>FaMusic</div>,
  // Add other icons as needed
}));

// Mock the react-icons/ai module
jest.mock('react-icons/ai', () => ({
  AiFillHeart: () => <div>AiFillHeart</div>,
  AiOutlineHeart: () => <div>AiOutlineHeart</div>
}));

describe('HomePage Component', () => {
  const mockStore = configureStore({
    reducer: {
      songs: songsReducer
    },
    preloadedState: {
      songs: {
        items: [
          {
            _id: '1',
            title: 'Test Song 1',
            artist: 'Test Artist 1',
            album: 'Test Album 1',
            year: '2021',
            genre: 'Rock',
            duration: '3:45',
            favorite: false
          },
          {
            _id: '2',
            title: 'Test Song 2',
            artist: 'Test Artist 2',
            album: 'Test Album 2',
            year: '2022',
            genre: 'Pop',
            duration: '4:20',
            favorite: true
          }
        ],
        status: 'idle',
        error: null
      }
    }
  });

  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );
  };

  test('renders the component with song list', () => {
    renderComponent();
    
    expect(screen.getByText('Song Library')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by title, artist, or album...')).toBeInTheDocument();
    expect(screen.getByText('Add New Song')).toBeInTheDocument();
    expect(screen.getByText('Favorite')).toBeInTheDocument();
    
    // Check if songs are rendered
    expect(screen.getByText('Test Song 1')).toBeInTheDocument();
    expect(screen.getByText('Test Song 2')).toBeInTheDocument();
  });

  test('filters songs based on search input', () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search by title, artist, or album...');
    fireEvent.change(searchInput, { target: { value: 'Test Song 1' } });
    
    expect(screen.getByText('Test Song 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Song 2')).not.toBeInTheDocument();
  });

  test('toggles favorite status when heart icon is clicked', async () => {
    renderComponent();
    
    // Find the first song's heart icon (should be outline initially)
    const heartIcons = screen.getAllByRole('button', { name: /heart/i });
    fireEvent.click(heartIcons[0]);
    
    // You would need to mock the dispatch action and check if it was called
    // This is a basic test - you'd expand this with your actual implementation
    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  test('navigates to favorite page when favorite button is clicked', () => {
    renderComponent();
    
    const favoriteButton = screen.getByText('Favorite');
    fireEvent.click(favoriteButton);
    
    // You would check navigation here - this depends on your test setup
    // For example, if using memory history:
    expect(window.location.pathname).toBe('/songs/favorite');
  });

  test('shows empty state when no songs match search', () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search by title, artist, or album...');
    fireEvent.change(searchInput, { target: { value: 'Non-existent song' } });
    
    expect(screen.getByText('No Songs Found')).toBeInTheDocument();
    expect(screen.getByText('Try adding a new song or adjusting your search')).toBeInTheDocument();
  });
});