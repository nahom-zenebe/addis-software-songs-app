/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaArrowRight, FaSpotify, FaYoutube, FaItunesNote } from 'react-icons/fa';
import { css, keyframes } from '@emotion/react';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #1c1f26, #282c34, #1a1e24, #21252b);
  background-size: 400% 400%;
  animation: ${gradientBG} 12s ease infinite;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 2rem;
  overflow: hidden;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #61dafb, #21a1f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const Button = styled.button`
  margin-top: 2rem;
  background: linear-gradient(135deg, #61dafb 0%, #21a1f1 100%);
  color: #1c1f26;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(97, 218, 251, 0.3);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out 0.4s both;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(33, 161, 241, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #21a1f1 0%, #61dafb 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const TilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 3rem 0;
  max-width: 1000px;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Tile = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.8s ease-out ${props => props.delay || '0s'} both;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const TileIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #61dafb;
`;

const TileTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: white;
`;

const TileText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const FloatingMusicNote = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: rgba(97, 218, 251, 0.6);
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 1;
`;

const WelcomePage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Create floating music notes
    const newNotes = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: `${Math.random() * 2}s`,
      icon: [FaMusic, FaSpotify, FaYoutube, FaItunesNote][i % 4]
    }));
    setNotes(newNotes);
  }, []);

  const handleClick = () => {
    navigate('/songs');
  };

  return (
    <Container>
      {/* Floating music notes */}
      {notes.map((note) => {
        const Icon = note.icon;
        return (
          <FloatingMusicNote
            key={note.id}
            style={{ left: `${note.left}%`, top: `${note.top}%` }}
            delay={note.delay}
          >
            <Icon />
          </FloatingMusicNote>
        );
      })}

      <Header>
        <Title>Discover Your Music Journey</Title>
        <Subtitle>
          Explore, create, and manage your music collection with our powerful platform.
          Join thousands of music lovers worldwide.
        </Subtitle>
      </Header>

      <TilesContainer>
        <Tile delay="0.2s">
          <TileIcon><FaMusic /></TileIcon>
          <TileTitle>Extensive Library</TileTitle>
          <TileText>
            Access thousands of songs from various genres and artists all in one place.
          </TileText>
        </Tile>
        <Tile delay="0.4s">
          <TileIcon><FaSpotify /></TileIcon>
          <TileTitle>Seamless Integration</TileTitle>
          <TileText>
            Connect with popular music platforms and sync your existing playlists.
          </TileText>
        </Tile>
        <Tile delay="0.6s">
          <TileIcon><FaItunesNote /></TileIcon>
          <TileTitle>Personalized Experience</TileTitle>
          <TileText>
            Get recommendations tailored to your unique taste and listening habits.
          </TileText>
        </Tile>
      </TilesContainer>

      <Button onClick={handleClick}>
        Get Started <FaArrowRight />
      </Button>
    </Container>
  );
};

export default WelcomePage;