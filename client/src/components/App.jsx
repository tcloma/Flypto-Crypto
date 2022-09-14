import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from "react";
import { useState } from "react";
import Homepage from './Homepage';
import Layout from './Layout';
import CoinPage from './CoinPage.jsx'
import '../styles/App.scss';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProfilePage from './ProfilePage';
import CryptoPage from './CryptoPage';
import { useEffect } from 'react';
import axios from 'axios'

const queryClient = new QueryClient();


const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('')
  const [user, setUser] = useState(null)


useEffect(() => {
  fetch('/me').then((res) => {
    if (res.ok) {
      res.json().then((user) => setUser(user))
    }
  })
}, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage setSelectedCoin={setSelectedCoin} />} />
            <Route path='/trade' element={<CoinPage selectedCoin={selectedCoin} />} />
            <Route path='/crypto' element={<CryptoPage />} />
            <Route path='/profile' element={<ProfilePage user={user} setUser={setUser}/>} />
            <Route path='/login' element={<LoginPage onLogin={setUser} />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
          <ReactQueryDevtools />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
