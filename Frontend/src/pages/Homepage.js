/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest,deleteSongRequest,createSongRequest , updateSongRequest} from '../../features/songs/songsSlice';
import { css, keyframes } from '@emotion/react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const container = css`
  max-width: 960px;
  margin: 3rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const heading = css`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #222;
  font-weight: 700;
`;

const list = css`
  list-style-type: none;
  padding: 0;
`;

const card = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f4f6;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: all 0.25s ease;

  &:hover {
    background: #e0e7ff;
    box-shadow: 0 6px 18px rgba(99,102,241,0.2);
  }
`;

const info = css`
  flex-grow: 1;

  strong {
    display: block;
    font-size: 1.2rem;
    color: #111827;
  }

  em {
    color: #4b5563;
    font-style: normal;
    font-weight: 500;
  }
`;

const actions = css`
  display: flex;
  gap: 0.75rem;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px;
    font-size: 1.2rem;
    color: #4b5563;
    transition: color 0.2s;

    &:hover {
      color: #6366f1;
    }

    &:active {
      color: #4338ca;
    }
  }
`;

const statusMessage = css`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
`;

const button = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem auto 0;
  padding: 10px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: #4f46e5;
  }

  &:active {
    background-color: #4338ca;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinner = css`
  margin: 40px auto;
  border: 6px solid #e0e7ff;
  border-top: 6px solid #6366f1;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.songs);
  const navigate = useNavigate();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSong, setEditSong] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', artist: '', album: '', year: '', genre: '', coverUrl: '' });

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleEditClick = (song) => {
    setEditSong(song);
    setEditForm({
      title: song.title || '',
      artist: song.artist || '',
      album: song.album || '',
      year: song.year || '',
      genre: song.genre || '',
      coverUrl: song.coverUrl || '',
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
    console.log(`View song ${id}`);

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

  if (status === 'loading') {
    return (
      <div css={container}>
        <div css={spinner} />
        <p css={statusMessage}>Loading songs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div css={container}>
        <p css={statusMessage}>Error loading songs: {error}</p>
        <button css={button} onClick={handleRetry}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div css={container}>
      <h1 css={heading}>🎶 Song Library</h1>
      <button css={button} onClick={() => navigate('/createsongs')}>
        <FaPlus /> Add Song
      </button>

      {/* Edit Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form onSubmit={handleEditSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <h2 style={{ marginBottom: 16 }}>Edit Song</h2>
            <div style={{ marginBottom: 12 }}>
              <label>Title</label>
              <input name="title" value={editForm.title} onChange={handleEditFormChange} style={{ width: '100%' }} required />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Artist</label>
              <input name="artist" value={editForm.artist} onChange={handleEditFormChange} style={{ width: '100%' }} required />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Album</label>
              <input name="album" value={editForm.album} onChange={handleEditFormChange} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Year</label>
              <input name="year" value={editForm.year} onChange={handleEditFormChange} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Genre</label>
              <input name="genre" value={editForm.genre} onChange={handleEditFormChange} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Cover URL</label>
              <input name="coverUrl" value={editForm.coverUrl} onChange={handleEditFormChange} style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button type="submit" style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Save</button>
              <button type="button" onClick={handleModalClose} style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 ? (
        <p css={statusMessage}>No songs available.</p>
      ) : (
        <ul css={list}>
          {items.map((song) => (
            <li key={song._id || song.id} css={card}>
              <div css={info}>
                <strong>{song.title}</strong>
                <em>{song.artist} • {song.album || "Unknown Album"} • {song.year || "Year N/A"}</em>
              </div>
              <div css={actions}>
                <button onClick={() => handleView(song.id || song._id)} title="View Details">
                  <FaEye />
                </button>
                <button onClick={() => handleEditClick(song)} title="Edit Song">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(song.id || song._id)} title="Delete Song">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
