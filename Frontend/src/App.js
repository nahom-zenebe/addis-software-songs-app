import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar';
import LoadingSpinner from './component/LoadingSpinner'; 
import FavoriteSongsPage from './pages/FavoriteSongsPage';
import SignupPage from './pages/signuppage'
import LoginPage from './pages/loginpage'
import Profilepage from './pages/Profilepage'
const WelcomePage = lazy(() => import('./pages/Welcomepage'));
const HomePage = lazy(() => import('./pages/Homepage'));
const PostSongs = lazy(() => import('./pages/PostSongs'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
 <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/Profilepage" element={<Profilepage/>}/>
          <Route path="/songs" element={<HomePage />} />
          <Route path="/songs/create" element={<PostSongs />} />
          <Route path="/songs/favorite" element={<FavoriteSongsPage />} />
          <Route path="/songs/:id" element={<DetailPage />} />
          <Route path="/songs/:id/edit" element={<PostSongs />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/loginpage" element={<LoginPage/>} />
         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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