import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';     
import NotFound from './pages/NotFound';      
import  Welcomepage from './pages/Welcomepage'
import PostSongs from './pages/PostSongs'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <Router>

  <Routes>
  <Route path="/" element={<Welcomepage />} />
  <Route path="/Homepage" element={< HomePage/>} />
  <Route path='/createsongs' element={<PostSongs/>}/>
  <Route path="*" element={<NotFound />} />

</Routes>
<ToastContainer position="top-right" autoClose={3000} />

    </Router>
  );
}

export default App;
