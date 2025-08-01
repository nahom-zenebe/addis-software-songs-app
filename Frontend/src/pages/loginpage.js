/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../features/songs/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // fixed

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
    setError("");

    try {
      await dispatch(loginRequest(formData));
      toast.success('Logged in successfully!', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });

      setFormData({
        email: '',
        password: ''
      });

      navigate('/songs');
    } catch (err) {
      console.error('Login error:', err);
      setError("Login failed. Please check your credentials.");
      toast.error('❌ Login failed. Try again.', {
        position: "top-right",
        autoClose: 3000,
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
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <button
            type="button"
            style={styles.linkButton}
            onClick={() => navigate("/signuppage")}
          >
            Click here
          </button>
        </p>

        <button
          type="submit"
          style={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at 20% 30%, rgba(108, 92, 231, 0.1) 0%, transparent 50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '2.5rem',
    borderRadius: '1rem',
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 8px 24px rgba(108, 92, 231, 0.3)',
    backdropFilter: 'blur(8px)',
  },
  title: {
    color: '#6c5ce7',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(108, 92, 231, 0.3)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '0.75rem',
    border: 'none',
    background: 'linear-gradient(135deg, #6c5ce7, #341f97)',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(108, 92, 231, 0.5)',
    transition: 'transform 0.2s ease',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  linkText: {
    color: '#341f97',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#6c5ce7',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0,
  },
};

export default LoginPage;
