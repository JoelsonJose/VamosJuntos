// src/App.js

import React from 'react';

import MainLayout from './components/Layout/MainLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    
    <MainLayout>
      <ProfilePage />
    </MainLayout>
  );
}

export default App;