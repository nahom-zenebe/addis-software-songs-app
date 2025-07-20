/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest, toggleFavoriteRequest } from '../../features/songs/songsSlice';
import { 
  FaEye, 

} from 'react-icons/fa';
import { css } from '@emotion/react';
import { 
  FaMusic, FaUser, FaCompactDisc, FaCalendarAlt,
  FaHeadphones, FaTimes, FaHeart
} from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import { 
  container, heading, list, card, cardHeader, 
  songTitle, songDetails, detailItem, actions,
  actionButton, primaryButton, emptyState, theme, spinner
} from './Homepage';


const statusMessage = css`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.1rem;
  color: ${theme.colors.gray || '#666'};
`;


const FavoriteSongsPage = () => {
  const dispatch = useDispatch();
  const { items = [], status, error } = useSelector((state) => state.songs || {});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const favoriteItems = items.filter(song => song.favorite);

  const handleToggleFavorite = (songId) => {
    dispatch(toggleFavoriteRequest(songId));
  };

  if (status === 'loading') {
    return (
      <div css={container}>
        <div css={spinner} />
        <p css={statusMessage}>Loading your favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div css={container}>
        <p css={statusMessage}>Error loading songs: {error}</p>
        <button css={primaryButton} onClick={() => dispatch(fetchSongsRequest())}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div css={container}>
      <h1 css={heading}>
        <FaHeart /> Favorite Songs
      </h1>

      {favoriteItems.length === 0 ? (
        <div css={emptyState}>
          <FaHeart />
          <h3>No Favorite Songs Yet</h3>
          <p>Click the heart icon on songs to add them to your favorites</p>
          <button css={primaryButton} onClick={() => navigate('/')}>
            Browse Songs
          </button>
        </div>
      ) : (
        <ul css={list}>
          {favoriteItems.map((song) => (
            <li key={song._id || song.id} css={card}>
              <div css={cardHeader}>
                <div css={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 css={songTitle}>{song.title}</h3>
                  <button 
                    onClick={() => handleToggleFavorite(song._id || song.id)}
                    css={css`
                      background: none;
                      border: none;
                      cursor: pointer;
                      color: ${theme.colors.danger};
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
              </div>
              <div css={actions}>
                <button 
                  css={actionButton} 
                  onClick={() => navigate(`/songs/${song._id || song.id}`)} 
                  title="View Details"
                >
                  <FaEye /> View
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteSongsPage;