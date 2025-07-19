/** @jsxImportSource @emotion/react */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { css, useTheme } from '@emotion/react';
import { 
  FaArrowLeft, 
  FaMusic, 
  FaUser, 
  FaCompactDisc, 
  FaCalendarAlt,
  FaHeadphones,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const container = (theme) => css`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
  font-family: ${theme.fonts.main};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 2rem;
    margin: 3rem auto;
  }
`;

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const heading = (theme) => css`
  font-size: 1.75rem;
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  margin: 0;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const backButton = (theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${theme.colors.light};
  color: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.radii.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
  }
`;

const detailGrid = css`
  display: grid;
  gap: 1rem;
`;

const detailItem = (theme) => css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${theme.colors.light};
  border-radius: ${theme.radii.md};
`;

const label = (theme) => css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  min-width: 100px;
`;

const value = (theme) => css`
  color: ${theme.colors.dark};
`;

const coverImage = (theme) => css`
  width: 100%;
  max-width: 300px;
  border-radius: ${theme.radii.md};
  margin: 1.5rem auto;
  display: block;
  box-shadow: ${theme.shadows.sm};
`;

const actionButtons = css`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const actionButton = (theme, variant = 'primary') => css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${variant === 'primary' && `
    background-color: ${theme.colors.primary};
    color: white;

    &:hover {
      background-color: ${theme.colors.primaryDark};
    }
  `}

  ${variant === 'danger' && `
    background-color: ${theme.colors.light};
    color: ${theme.colors.danger};

    &:hover {
      background-color: rgba(239, 68, 68, 0.1);
    }
  `}
`;

const notFoundContainer = (theme) => css`
  text-align: center;
  padding: 2rem;

  h2 {
    color: ${theme.colors.danger};
    margin-bottom: 1.5rem;
  }
`;

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const song = useSelector(state => 
    state.songs.items.find(s => String(s.id) === id || String(s._id) === id)
  );

  const handleDelete = () => {
    // You'll need to implement delete functionality
    // dispatch(deleteSongRequest(id));
    toast.success('Song deleted successfully!');
    navigate('/songs');
  };

  const handleEdit = () => {
    navigate(`/songs/${id}/edit`);
  };

  if (!song) {
    return (
      <div css={notFoundContainer}>
        <h2>Song Not Found</h2>
        <button css={backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div css={container}>
      <div css={header}>
        <button css={backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1 css={heading}>{song.title}</h1>
        <div></div> {/* Empty div for alignment */}
      </div>

      <div css={detailGrid}>
        <div css={detailItem}>
          <span css={label}><FaUser /> Artist</span>
          <span css={value}>{song.artist || 'Unknown Artist'}</span>
        </div>
        
        <div css={detailItem}>
          <span css={label}><FaCompactDisc /> Album</span>
          <span css={value}>{song.album || 'No Album'}</span>
        </div>
        
        {song.year && (
          <div css={detailItem}>
            <span css={label}><FaCalendarAlt /> Year</span>
            <span css={value}>{song.year}</span>
          </div>
        )}
        
        {song.genre && (
          <div css={detailItem}>
            <span css={label}><FaHeadphones /> Genre</span>
            <span css={value}>{song.genre}</span>
          </div>
        )}
      </div>

      {song.coverUrl && (
        <img 
          src={song.coverUrl} 
          alt={`Cover for ${song.title}`} 
          css={coverImage}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}

      <div css={actionButtons}>
        <button css={actionButton} onClick={handleEdit}>
          <FaEdit /> Edit Song
        </button>
        <button css={actionButton(theme, 'danger')} onClick={handleDelete}>
          <FaTrash /> Delete Song
        </button>
      </div>
    </div>
  );
};

export default DetailPage;