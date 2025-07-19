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
  FaWaveSquare,
  FaRecordVinyl
} from 'react-icons/fa';
import { GiGuitarHead, GiPianoKeys } from 'react-icons/gi';
import { RiDiscLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


// Theme definition with enhanced color palette
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

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const recordSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Base styles
const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
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
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba(108, 92, 231, 0.1) 0%, transparent 50%);
    z-index: 0;
  }
`;

const FormCard = css`
  background: ${theme.colors.cardBg};
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.lg};
  width: 100%;
  max-width: 580px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform ${theme.transitions.normal}, box-shadow ${theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.primary};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
  }
`;

const FormHeader = css`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  position: relative;
`;

const Title = css`
  color: ${theme.colors.primaryLight};
  margin-bottom: ${theme.spacing.sm};
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
    margin: ${theme.spacing.sm} auto;
    border-radius: ${theme.radii.pill};
  }
`;

const Subtitle = css`
  color: ${theme.colors.textMuted};
  font-size: 0.95rem;
  max-width: 80%;
  margin: 0 auto;
  line-height: 1.6;
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
  position: relative;
`;

const Label = css`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.primaryLight};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-left: ${theme.spacing.sm};
`;

const InputWrapper = css`
  position: relative;
`;

const InputIcon = css`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.primary};
  font-size: 1.1rem;
  z-index: 2;
`;

const InputStyle = css`
  width: 100%;
  padding: 14px 14px 14px 48px;
  border-radius: ${theme.radii.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1rem;
  background: ${theme.colors.inputBg};
  color: ${theme.colors.text};
  transition: all ${theme.transitions.normal};
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: ${theme.colors.inputFocus};
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.3);
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
    opacity: 0.6;
  }
`;

const Button = css`
  margin-top: ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 16px;
  border: none;
  border-radius: ${theme.radii.lg};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.primary};
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(108, 92, 231, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${theme.colors.inputBg};
    color: ${theme.colors.textMuted};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      animation: ${pulseAnimation} 1.5s ease infinite;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${theme.colors.primaryDark}, ${theme.colors.primary});
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const floatingIcon = css`
  animation: ${floatAnimation} 3s ease-in-out infinite;
  color: ${theme.colors.primaryLight};
`;

const recordStyle = css`
  position: absolute;
  right: -30px;
  top: -30px;
  font-size: 6rem;
  color: rgba(255, 255, 255, 0.05);
  animation: ${recordSpin} 20s linear infinite;
  z-index: 0;
`;

const guitarStyle = css`
  position: absolute;
  left: -20px;
  bottom: 20px;
  font-size: 4rem;
  color: rgba(253, 121, 168, 0.1);
  transform: rotate(-20deg);
  z-index: 0;
`;

const pianoStyle = css`
  position: absolute;
  right: -20px;
  bottom: 40px;
  font-size: 3.5rem;
  color: rgba(0, 184, 148, 0.1);
  transform: rotate(15deg);
  z-index: 0;
`;

const waveStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
  font-size: 2rem;
  color: rgba(108, 92, 231, 0.2);
  z-index: 0;
`;

const PostSongs = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
    coverUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const  navigator=useNavigate();

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
      toast.success('🎵 Song added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFormData({
        title: '',
        artist: '',
        album: '',
        year: '',
        genre: '',
        coverUrl: ''
      });
      navigator('/songs')
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('❌ Failed to add song. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preload icons to prevent flicker
  useEffect(() => {
    const icons = [
      FaMusic, FaUserAlt, FaCompactDisc, FaCalendarAlt, 
      FaHeadphonesAlt, FaImage, FaPlusCircle, FaWaveSquare,
      GiGuitarHead, GiPianoKeys, RiDiscLine
    ];
  }, []);

  return (
    <div css={[globalStyles, Container]}>
      <div css={FormCard}>
        {/* Decorative elements */}
        <RiDiscLine css={recordStyle} />
        <GiGuitarHead css={guitarStyle} />
        <GiPianoKeys css={pianoStyle} />
        <FaWaveSquare css={waveStyle} />
        
        <div css={FormHeader}>
          <h2 css={Title}>
            <FaMusic css={floatingIcon} />
            Add New Track
          </h2>
          <p css={Subtitle}>Fill in the details to add a new masterpiece to your collection</p>
        </div>
        
        <form css={FormStyle} onSubmit={handleSubmit}>
          <div css={InputGroup}>
            <label css={Label} htmlFor="title">
              <FaMusic /> Track Title
            </label>
            <div css={InputWrapper}>
              <span css={InputIcon}>
                <FaMusic />
              </span>
              <input
                css={InputStyle}
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g., Bohemian Rhapsody"
                required 
              />
            </div>
          </div>

          <div css={InputGroup}>
            <label css={Label} htmlFor="artist">
              <FaUserAlt /> Artist/Band
            </label>
            <div css={InputWrapper}>
              <span css={InputIcon}>
                <FaUserAlt />
              </span>
              <input
                css={InputStyle}
                type="text" 
                id="artist" 
                name="artist" 
                value={formData.artist} 
                onChange={handleChange} 
                placeholder="e.g., Queen"
                required 
              />
            </div>
          </div>

          <div css={InputGroup}>
            <label css={Label} htmlFor="album">
              <FaCompactDisc /> Album
            </label>
            <div css={InputWrapper}>
              <span css={InputIcon}>
                <FaCompactDisc />
              </span>
              <input
                css={InputStyle}
                type="text" 
                id="album" 
                name="album" 
                value={formData.album} 
                onChange={handleChange} 
                placeholder="e.g., A Night at the Opera"
              />
            </div>
          </div>

          <div css={InputGroup}>
            <label css={Label} htmlFor="year">
              <FaCalendarAlt /> Release Year
            </label>
            <div css={InputWrapper}>
              <span css={InputIcon}>
                <FaCalendarAlt />
              </span>
              <input
                css={InputStyle}
                type="number" 
                id="year" 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                placeholder="e.g., 1975"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div css={InputGroup}>
            <label css={Label} htmlFor="genre">
              <FaHeadphonesAlt /> Genre
            </label>
            <div css={InputWrapper}>
              <span css={InputIcon}>
                <FaHeadphonesAlt />
              </span>
              <input
                css={InputStyle}
                type="text" 
                id="genre" 
                name="genre" 
                value={formData.genre} 
                onChange={handleChange} 
                placeholder="e.g., Rock, Pop, Jazz"
              />
            </div>
          </div>

          <div css={InputGroup}>
            <label css={Label} htmlFor="coverUrl">
              <FaImage /> Cover Art URL
            </label>
            <div css={InputWrapper}>
              <span css={InputIcon}>
                <FaImage />
              </span>
              <input
                css={InputStyle}
                type="url" 
                id="coverUrl" 
                name="coverUrl" 
                value={formData.coverUrl} 
                onChange={handleChange} 
                placeholder="https://example.com/album-cover.jpg"
              />
            </div>
          </div>

          <button 
            css={Button} 
            type="submit" 
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            <FaPlusCircle />
            {isSubmitting ? 'Creating...' : 'Add to Library'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostSongs;