// src/component/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

const navbar = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1e2f;
  padding: 1rem 2rem;
  color: white;
`;

const navLinks = css`
  display: flex;
  gap: 1.5rem;
`;

const linkStyle = (active) => css`
  color: ${active ? '#61dafb' : '#fff'};
  text-decoration: none;
  font-weight: ${active ? 'bold' : 'normal'};
  font-size: 1rem;

  &:hover {
    color: #61dafb;
  }
`;

function Navbar() {
  const location = useLocation();

  return (
    <nav css={navbar}>
      <h2>Song Library</h2>
      <div css={navLinks}>
        <Link to="/songs" css={linkStyle(location.pathname === '/songs')}>
          Home
        </Link>
        <Link to="/songs/create" css={linkStyle(location.pathname === '/songs/create')}>
          Create Song
        </Link>
        <Link to="/songs/favorite" css={linkStyle(location.pathname === '/songs/favorite')}>
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
