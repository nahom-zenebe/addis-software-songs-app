/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createSongRequest } from '../../features/songs/songsSlice';
import { css, keyframes } from '@emotion/react';
import { toast } from 'react-toastify';
import { 
  FaMusic, 
  FaUserAlt, 
  FaCompactDisc, 
  FaCalendarAlt, 
  FaHeadphonesAlt, 
  FaImage,
  FaPlusCircle,
  FaHashtag,
  FaUserEdit,
  FaCalendarCheck,
  FaPlayCircle
} from 'react-icons/fa';
import { GiGuitarHead, GiPianoKeys } from 'react-icons/gi';
import { RiDiscLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

// 🔹 Theme, animations, styles (keeping your original unchanged)
const theme = {
  colors: {
    primary: '#6C5CE7',
    primaryLight: '#A29BFE',
    primaryDark: '#5649C2',
    secondary: '#00B894',
    accent: '#FD79A8',
    background: '#0F0E15',
    cardBg: '#1E1B2B',
    inputBg: '#2D2A3A',
    inputFocus: '#3A3750',
    text: '#F8F9FA',
    textMuted: '#ADB5BD',
    error: '#FF7675',
    success: '#55EFC4',
    warning: '#FDCB6E'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  radii: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    pill: '50px'
  },
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.3)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.4)',
    primary: '0 4px 24px rgba(108, 92, 231, 0.4)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = css`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl};
  background: linear-gradient(-45deg, #0F0E15, #1E1B2B, #2D2A3A, #3A3750);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const FormCard = css`
  background: ${theme.colors.cardBg};
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.lg};
  width: 100%;
  max-width: 580px;
`;

const FormHeader = css`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const Title = css`
  color: ${theme.colors.primaryLight};
  margin-bottom: ${theme.spacing.sm};
  font-size: 2rem;
  font-weight: 700;
`;

const FormStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const InputGroup = css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = css`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.primaryLight};
`;

const InputStyle = css`
  width: 100%;
  padding: 14px;
  border-radius: ${theme.radii.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1rem;
  background: ${theme.colors.inputBg};
  color: ${theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: ${theme.colors.inputFocus};
  }
`;

const Button = css`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 16px;
  border: none;
  border-radius: ${theme.radii.lg};
  cursor: pointer;
`;

const PostSongs = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    year: '',
    genre: '',
    duration:'',
    coverUrl:'',
    trackNumber:'',
    composer:'',
    releaseDate:'',
    playCount:''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createSongRequest(formData));
      toast.success('🎵 Song added successfully!', { theme: "dark" });
      setFormData({
        title: '',
        artist: '',
        year: '',
        genre: '',
        duration:'',
        coverUrl:'',
        trackNumber:'',
        composer:'',
        releaseDate:'',
        playCount:''
      });
      navigate('/songs');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('❌ Failed to add song.', { theme: "dark" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div css={Container}>
      <div css={FormCard}>
        <div css={FormHeader}>
          <h2 css={Title}>Add New Track</h2>
        </div>
        
        <form css={FormStyle} onSubmit={handleSubmit}>
          {[
            { name: "title", label: "Track Title", icon: <FaMusic /> },
            { name: "artist", label: "Artist/Band", icon: <FaUserAlt /> },
            { name: "year", label: "Release Year", icon: <FaCalendarAlt />, type: "number" },
            { name: "genre", label: "Genre", icon: <FaHeadphonesAlt /> },
            { name: "duration", label: "Duration (sec)", icon: <FaPlayCircle /> },
            { name: "coverUrl", label: "Cover URL", icon: <FaImage /> },
            { name: "trackNumber", label: "Track Number", icon: <FaHashtag />, type: "number" },
            { name: "composer", label: "Composer", icon: <FaUserEdit /> },
            { name: "releaseDate", label: "Release Date", icon: <FaCalendarCheck />, type: "date" },
            { name: "playCount", label: "Play Count", icon: <FaPlayCircle />, type: "number" }
          ].map(field => (
            <div css={InputGroup} key={field.name}>
              <label css={Label}>{field.icon} {field.label}</label>
              <input
                css={InputStyle}
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={["title","artist"].includes(field.name)}
              />
            </div>
          ))}

          <button css={Button} type="submit" disabled={isSubmitting}>
            <FaPlusCircle /> {isSubmitting ? 'Adding...' : 'Add to Library'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostSongs;
