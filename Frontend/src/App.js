import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';     
import  NotFound from './pages/NotFound';      
import WelcomePage from './pages/Welcomepage';
import  PostSongs from './pages/PostSongs';
import DetailPage from './pages/DetailPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/songs" element={<HomePage />} />
        <Route path="/songs/create" element={< PostSongs/>} />
        <Route path="/songs/:id" element={<DetailPage />} />
        <Route path="/songs/:id/edit" element={< PostSongs />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;