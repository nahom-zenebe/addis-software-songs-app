/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest, deleteSongRequest, updateSongRequest,   toggleFavoriteRequest  } from '../../features/songs/songsSlice';
import { css, keyframes, useTheme } from '@emotion/react';
import { 
  FaEye, FaEdit, FaTrash, FaPlus, FaSearch, 
  FaMusic, FaUser, FaCompactDisc, FaCalendarAlt,
  FaHeadphones, FaImage, FaTimes, FaSave,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai';
// Theme definition
export const  theme = {
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryDarker: '#4338ca',
    secondary: '#f59e0b',
    light: '#f8fafc',
    dark: '#1e293b',
    gray: '#64748b',
    lightGray: '#e2e8f0',
    danger: '#ef4444',
    success: '#10b981'
  },
  fonts: {
    main: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    heading: "'Poppins', sans-serif"
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.1)',
    primary: '0 4px 20px rgba(99, 102, 241, 0.3)'
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};

// Base styles
const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f1f5f9;
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.main};
    line-height: 1.5;
  }
`;

export const container = css`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 2rem;
    margin: 3rem auto;
  }
`;

export const  heading = css`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

export const  searchContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const  searchInput = (theme) => css`
  flex-grow: 1;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.lightGray};
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: ${theme.colors.light};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2364768b' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 1rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 400px;
    margin-right: auto;
  }
`;

export const  list = css`
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 1rem;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

export const  card = (theme) => css`
  background: #fff;
  padding: 1.25rem;
  border-radius: ${theme.radii.md};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.3s ease;
  border-left: 4px solid ${theme.colors.primary};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    border-left-color: ${theme.colors.secondary};
  }
`;

export const  cardHeader = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const  songTitle = (theme) => css`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.dark};
  margin-right: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const  songDetails = (theme) => css`
  color: ${theme.colors.gray};
  font-size: 0.875rem;
  display: grid;
  gap: 0.5rem;
`;

export const  detailItem = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const  actions = css`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px dashed #e2e8f0;
`;

export const  actionButton = (theme, variant = 'primary') => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: ${theme.radii.sm};
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  color: ${variant === 'danger' ? theme.colors.danger : theme.colors.primaryDark};
  background-color: ${variant === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};

  &:hover {
    background-color: ${variant === 'danger' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)'};
    color: ${variant === 'danger' ? theme.colors.danger : theme.colors.primaryDarker};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const  primaryButton = (theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${theme.shadows.sm};

  &:hover {
    background-color: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.primary};
  }

  &:active {
    background-color: ${theme.colors.primaryDarker};
    transform: translateY(1px);
  }
`;

export const  spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const  spinner = css`
  margin: 40px auto;
  border: 4px solid rgba(99, 102, 241, 0.1);
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export const  statusMessage = (theme) => css`
  text-align: center;
  font-size: 1.1rem;
  color: ${theme.colors.gray};
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: ${theme.colors.light};
  border-radius: ${theme.radii.md};
`;

export const  modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const  modalContent = (theme) => css`
  background: #fff;
  padding: 2rem;
  border-radius: ${theme.radii.lg};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const  modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const  modalTitle = css`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.primaryDark};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const  closeButton = (theme) => css`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.gray};
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.danger};
  }
`;

export const  formGroup = css`
  margin-bottom: 1rem;
`;

export const  formLabel = (theme) => css`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${theme.colors.dark};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const  formInput = (theme) => css`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: ${theme.radii.sm};
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

export const formActions = css`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const  submitButton = (theme) => css`
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const  cancelButton = (theme) => css`
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.dark};
  border: none;
  border-radius: ${theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #d1d5db;
  }
`;

export const emptyState = (theme) => css`
  text-align: center;
  padding: 3rem;
  background-color: ${theme.colors.light};
  border-radius: ${theme.radii.md};
  margin: 2rem 0;

  svg {
    font-size: 3rem;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${theme.colors.dark};
  }

  p {
    color: ${theme.colors.gray};
    margin-bottom: 1.5rem;
  }
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { items = [], status, error, pagination } = useSelector((state) => state.songs || {});
  const navigate = useNavigate();
  const theme = useTheme();
  const [favorite,setfavorite]=useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSong, setEditSong] = useState(null);
  const [editForm, setEditForm] = useState({ 
    title: '', 
    artist: '', 
    album: '', 
    year: '', 
    genre: '', 
    duration:'',

  });
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);
  
  const handleToggleFavorite = (songId) => {
    dispatch(toggleFavoriteRequest(songId));
  };
  const filteredItems = items.filter(song => {
    const q = search.toLowerCase();
    return (
      song.title?.toLowerCase().includes(q) ||
      song.artist?.toLowerCase().includes(q) ||
      song.album?.toLowerCase().includes(q)
    );
  });

  const handleEditClick = (song) => {
    setEditSong(song);
    setEditForm({
      title: song.title || '',
      artist: song.artist || '',
      album: song.album || '',
      year: song.year || '',
      genre: song.genre || '',
     duration:song.duration||'',
    
    });
    setIsModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editSong) return;
    dispatch(updateSongRequest({ id: editSong.id || editSong._id, songData: editForm }));
    setIsModalOpen(false);
    toast.success('Song updated successfully!');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditSong(null);
  };

  const handleRetry = () => {
    dispatch(fetchSongsRequest());
  };

  const handleView = (id) => {
    navigate(`/songs/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deleteSongRequest(id));
      toast.success('Song deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'An unexpected error occurred while deleting.');
    }
  };

  // Pagination controls
  const handlePageChange = (page) => {
    dispatch({ type: 'songs/fetchSongsRequest', payload: { page, itemsPerPage: 4 } });
  };

  if (status === 'loading') {
    return (
      <div css={container}>
        <div css={spinner} />
        <p css={statusMessage}>Loading your music library...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div css={container}>
        <p css={statusMessage}>Error loading songs: {error}</p>
        <button css={primaryButton} onClick={handleRetry}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div css={globalStyles}>
      <div css={container}>
        <h1 css={heading}>
          <FaMusic /> Song Library
        </h1>

        <div css={searchContainer}>
          <div css={{ position: 'relative', width: '100%' }}>
            <FaSearch css={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.gray
            }} />
            <input
              type="text"
              placeholder="Search by title, artist, or album..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              css={searchInput}
            />
          </div>
          <button css={primaryButton} onClick={() => navigate('/songs/create')}>
            <FaPlus /> Add New Song
          </button>

          <button css={primaryButton}  onClick={() => navigate('/songs/favorite')}>
          <AiFillHeart/>Favorite
          </button>
        </div>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
          <button
            css={primaryButton}
            onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              css={primaryButton}
              style={{ margin: '0 0.25rem', background: pagination.currentPage === i + 1 ? theme.colors.primaryDark : undefined }}
              onClick={() => handlePageChange(i + 1)}
              disabled={pagination.currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
          <button
            css={primaryButton}
            onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>

        {isModalOpen && (
          <div css={modalOverlay}>
            <div css={modalContent}>
              <div css={modalHeader}>
                <h2 css={modalTitle}><FaEdit /> Edit Song</h2>
                <button css={closeButton} onClick={handleModalClose}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div css={formGroup}>
                  <label css={formLabel}><FaMusic /> Title</label>
                  <input 
                    name="title" 
                    value={editForm.title} 
                    onChange={handleEditFormChange} 
                    css={formInput} 
                    required 
                  />
                </div>
                <div css={formGroup}>
                  <label css={formLabel}><FaUser /> Artist</label>
                  <input 
                    name="artist" 
                    value={editForm.artist} 
                    onChange={handleEditFormChange} 
                    css={formInput} 
                    required 
                  />
                </div>
                <div css={formGroup}>
                  <label css={formLabel}><FaCompactDisc /> Album</label>
                  <input 
                    name="album" 
                    value={editForm.album} 
                    onChange={handleEditFormChange} 
                    css={formInput} 
                  />
                </div>
                <div css={formGroup}>
                  <label css={formLabel}><FaCalendarAlt /> Year</label>
                  <input 
                    name="year" 
                    value={editForm.year} 
                    onChange={handleEditFormChange} 
                    css={formInput} 
                    type="number"
                  />
                </div>
                <div css={formGroup}>
                  <label css={formLabel}><FaHeadphones /> Genre</label>
                  <input 
                    name="genre" 
                    value={editForm.genre} 
                    onChange={handleEditFormChange} 
                    css={formInput} 
                  />
                </div>
                <div css={formGroup}>
                  <label css={formLabel}><FaImage /> duration</label>
                  <input 
                    name="duration" 
                    value={editForm.duration} 
                    onChange={handleEditFormChange} 
                    css={formInput} 
                  />
                </div>
                <div css={formActions}>
                  <button type="button" css={cancelButton} onClick={handleModalClose}>
                    Cancel
                  </button>
                  <button type="submit" css={submitButton}>
                    <FaSave /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div css={emptyState}>
            <FaMusic />
            <h3>No Songs Found</h3>
            <p>Try adding a new song or adjusting your search</p>
            <button css={primaryButton} onClick={() => navigate('/createsongs')}>
              <FaPlus /> Add Your First Song
            </button>
          </div>
        ) : (
          <ul css={list}>
            {filteredItems.map((song) => (
              <li key={song._id || song.id} css={card}>
                <div css={cardHeader}>
                  <div  css={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 css={songTitle}>{song.title}</h3>
                  <button 
  onClick={() => handleToggleFavorite(song._id || song.id)}
  css={css`
    background: none;
    border: none;
    cursor: pointer;
    color: ${song.favorite ? theme.colors.danger : theme.colors.gray};
    font-size: 1.25rem;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  `}
>
  {song.favorite ? <AiFillHeart /> : <AiOutlineHeart />}
</button>
                  </div>
                
                </div>
                <div css={songDetails}>
                  <div css={detailItem}><FaUser /> {song.artist || 'Unknown Artist'}</div>
                  <div css={detailItem}><FaCompactDisc /> {song.album || 'No Album'}</div>
                  {song.year && <div css={detailItem}><FaCalendarAlt /> {song.year}</div>}
                  {song.genre && <div css={detailItem}><FaHeadphones /> {song.genre}</div>}
                  <div css={detailItem}><FaCompactDisc /> {song.duration+ "min" || 'No duration'}</div>
                </div>
                <div css={actions}>
                  <button 
                    css={actionButton} 
                    onClick={() => handleView(song.id || song._id)} 
                    title="View Details"
                  >
                    <FaEye /> View
                  </button>
                  <button 
                    css={actionButton} 
                    onClick={() => handleEditClick(song)} 
                    title="Edit Song"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    css={actionButton(theme, 'danger')} 
                    onClick={() => handleDelete(song.id || song._id)} 
                    title="Delete Song"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;