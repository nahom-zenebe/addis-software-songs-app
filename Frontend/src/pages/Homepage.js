/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from '../../features/songs/songsSlice';
import { css, keyframes } from '@emotion/react';

const container = css`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const heading = css`
  font-size: 2.8rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #222;
  font-weight: 700;
  letter-spacing: 1.2px;
`;

const list = css`
  list-style-type: none;
  padding: 0;
`;

const listItem = css`
  background-color: #f9fafb;
  margin-bottom: 15px;
  padding: 18px 24px;
  border-radius: 10px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);

  &:hover {
    background-color: #e0e7ff;
    box-shadow: 0 6px 15px rgba(99,102,241,0.3);
  }

  em {
    font-style: normal;
    color: #6366f1;
    font-weight: 600;
  }
`;

const statusMessage = css`
  text-align: center;
  font-size: 1.3rem;
  color: #666;
  margin-top: 2rem;
`;

const button = css`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 28px;
  font-size: 1.1rem;
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

// Spinner animation
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

  useEffect(() => {
    try{
        dispatch(fetchSongsRequest());
    }
    catch(error){
        console.log(error)
    }
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchSongsRequest());
  };

  if (status === 'loading') {
    return (
      <div css={container}>
        <div css={spinner} aria-label="Loading spinner" />
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
      <h1 css={heading}>Song List</h1>
      {items.length === 0 ? (
        <p css={statusMessage}>No songs found.</p>
      ) : (
        <ul css={list}>
          {items.map((song) => (
            <li key={song._id || song.id} css={listItem}>
              {song.title} — <em>{song.artist}</em> ({song.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
