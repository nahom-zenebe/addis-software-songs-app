import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchSongs = createAsyncThunk(
  'songs/getsongs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.Backend_Url}/songs/getsongs`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const createSong = createAsyncThunk(
  'songs/createsongs',
  async (songData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.Backend_Url}/songs/createsongs`, songData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateSong = createAsyncThunk(
  'songs/updatesongs',
  async ({ id, songData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${process.env.Backend_Url}/songs/updatesongs/${id}`, songData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteSong = createAsyncThunk(
  'songs/deletesongs',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.Backend_Url}/songs/deletesongs/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
