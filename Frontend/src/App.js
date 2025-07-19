import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';     
import NotFound from './pages/NotFound';      
import  Welcomepage from './pages/Welcomepage'
function App() {
  return (
    <Router>
  <Link to={'/Homepage'}>elcome</Link>
  <Routes>
  <Route path="/" element={<Welcomepage />} />
  <Route path="/Homepage" element={< HomePage/>} />
  <Route path="*" element={<NotFound />} />
  
</Routes>


    </Router>
  );
}

export default App;
