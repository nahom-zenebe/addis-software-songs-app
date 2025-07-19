import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #282c34 0%, #1c1f26 100%);
  color: #61dafb;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 16px;
`;

const Button = styled.button`
  margin-top: 40px;
  background-color: #61dafb;
  color: #282c34;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(97, 218, 251, 0.4);

  &:hover {
    background-color: #21a1f1;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(33, 161, 241, 0.6);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 8px rgba(33, 161, 241, 0.4);
  }
`;

const Welcomepage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Homepage');
  };

  return (
    <Container>
      Welcome to the site!
      <Button onClick={handleClick}>Get Started</Button>
    </Container>
  );
};

export default Welcomepage;

