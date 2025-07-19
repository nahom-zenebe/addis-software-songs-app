/** @jsxImportSource @emotion/react */
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest,deleteSongRequest,createSongRequest , updateSongRequest} from '../../features/songs/songsSlice';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1c1f26, #282c34);
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
`;

const Form = styled.form`
  background: #2a2e38;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background: #3a3f4b;
  color: #ffffff;

  &:focus {
    outline: none;
    border: 2px solid #61dafb;
    background: #444b58;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #61dafb;
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #61dafb;
  color: #1c1f26;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #21a1f1;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
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
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.songs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createSongRequest(formData));
      toast.success('Song added successfully!');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

        <Label htmlFor="artist">Artist</Label>
        <Input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange} required />

        <Label htmlFor="album">Album</Label>
        <Input type="text" id="album" name="album" value={formData.album} onChange={handleChange} />

        <Label htmlFor="year">Year</Label>
        <Input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />

        <Label htmlFor="genre">Genre</Label>
        <Input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />

        <Label htmlFor="coverUrl">Cover Image URL</Label>
        <Input type="url" id="coverUrl" name="coverUrl" value={formData.coverUrl} onChange={handleChange} />

        <Button type="submit">Submit Song</Button>
      </Form>
    </Container>
  );
};

export default PostSongs;
