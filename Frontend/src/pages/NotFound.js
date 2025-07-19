/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { FaFrown, FaHome, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1e24 0%, #282c34 100%);
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(to right, #ff6b6b, #ff8e8e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shake} 0.8s ease-in-out;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
  animation: ${fadeIn} 0.8s ease-out 0.3s both;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  animation: ${fadeIn} 0.8s ease-out 0.5s both;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #ff6b6b;
  animation: ${float} 3s ease-in-out infinite;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  animation: ${fadeIn} 0.8s ease-out 0.7s both;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #61dafb 0%, #21a1f1 100%)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.primary ? '#1c1f26' : 'white'};
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconContainer>
        <FaFrown />
      </IconContainer>
      <ErrorCode>404</ErrorCode>
      <Title>Oops! Page Not Found</Title>
      <Message>
        The page you're looking for doesn't exist or has been moved.
        Don't worry, let's get you back on track.
      </Message>
      
      <ButtonGroup>
        <Button primary onClick={() => navigate('/')}>
          <FaHome /> Go Home
        </Button>
        <Button onClick={() => window.history.back()}>
          <FaSearch /> Back to Previous
        </Button>
      </ButtonGroup>

      {/* Decorative elements */}
      <div css={css`
        position: absolute;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(97, 218, 251, 0.1) 0%, transparent 70%);
        top: -100px;
        right: -100px;
        z-index: -1;
      `} />
      
      <div css={css`
        position: absolute;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
        bottom: -150px;
        left: -150px;
        z-index: -1;
      `} />
    </Container>
  );
};

export default NotFound;