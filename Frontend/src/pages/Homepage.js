
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from '../../features/songs/songsSlice';
import { css } from '@emotion/react';

const container = css`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const heading = css`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #222;
`;

const list = css`
  list-style-type: none;
  padding: 0;
`;

const listItem = css`
  background-color: #f1f5f9;
  margin-bottom: 10px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #e0e7ff;
  }
`;

const statusMessage = css`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  if (status === 'loading') return <p css={statusMessage}>Loading songs...</p>;
  if (error) return <p css={statusMessage}>Error: {error}</p>;

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
