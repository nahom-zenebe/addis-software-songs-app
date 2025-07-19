import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';

const container = css`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const heading = css`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #222;
  font-weight: 700;
`;

const label = css`
  font-weight: 600;
  color: #6366f1;
`;

const value = css`
  margin-left: 8px;
  color: #222;
`;

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const song = useSelector(state => state.songs.items.find(s => String(s.id) === id || String(s._id) === id));

  if (!song) {
    return (
      <div css={container}>
        <h2 css={heading}>Song Not Found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: 24 }}>Go Back</button>
      </div>
    );
  }

  return (
    <div css={container}>
      <h2 css={heading}>{song.title}</h2>
      <div><span css={label}>Artist:</span><span css={value}>{song.artist}</span></div>
      <div><span css={label}>Album:</span><span css={value}>{song.album || 'Unknown'}</span></div>
      <div><span css={label}>Year:</span><span css={value}>{song.year || 'N/A'}</span></div>
      <div><span css={label}>Genre:</span><span css={value}>{song.genre || 'N/A'}</span></div>
      {song.coverUrl && <div style={{ margin: '16px 0' }}><img src={song.coverUrl} alt={song.title} style={{ maxWidth: 200, borderRadius: 8 }} /></div>}
      <button onClick={() => navigate(-1)} style={{ marginTop: 24 }}>Go Back</button>
    </div>
  );
};

export default DetailPage; 