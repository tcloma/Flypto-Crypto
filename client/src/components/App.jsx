import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
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
import axios from 'axios';
// import axios from 'axios'


const queryClient = new QueryClient();

const App = () => {
  const [purchasedCoins, setPurchasedCoins] = ([])
  const [selectedCoin, setSelectedCoin] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    })
    // fetch('/purchasedcoins')
    //   .then((res) => {
    //     if (res.ok) {
    //       res.json()
    //         .then((purchasedCoins) => setPurchasedCoins(purchasedCoins))
    //     }
    //   })
  }, []);



  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout user={user} setUser={setUser}>
          <Routes>
            <Route path='/' element={<Homepage setSelectedCoin={setSelectedCoin} />} />
            <Route path='/trade' element={<CoinPage setUser={setUser} user={user} selectedCoin={selectedCoin} />} />
            <Route path='/logout' />
            <Route path='/crypto' element={<CryptoPage setSelectedCoin={setSelectedCoin} />} />
            <Route path='/profile' element={<ProfilePage username={user?.name} setSelectedCoin={setSelectedCoin} />} />
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
