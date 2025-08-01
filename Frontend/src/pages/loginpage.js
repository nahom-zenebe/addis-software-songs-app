/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  loginRequest } from '../../features/songs/userSlice';
import { css, keyframes } from '@emotion/react';
import { toast } from 'react-toastify';
import SignupPage from "./signuppage";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
    duration:''
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
      await dispatch( loginRequest(formData));
      toast.success('logining successfully!', {
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
        duration:''
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

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <h2 style={styles.title}>Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <br></br>

<TileText>
    don't  have Account? <button onClick={()=> navigator("/signuppage")}>Click here</button>
  </TileText>
  <br></br>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  ...SignupPage.styles, 
};

export default LoginPage;
