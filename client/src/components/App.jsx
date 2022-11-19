// Dependencies
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/App.scss';

// Components
import Homepage from './Homepage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import CryptoPage from './CryptoPage';
import CoinPage from './CoinPage'
import Layout from './Layout';

const queryClient = new QueryClient();

const App = () => {
   const [purchasedCoins, setPurchasedCoins] = ([])
   const [selectedCoin, setSelectedCoin] = useState('')
   const [user, setUser] = useState({})
   const [userCoins, setUserCoins] = useState([])

   useEffect(() => {
      fetch('/me').then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               if (!!user.email) {
                  setUser(user)
               }
            })
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

   useEffect(() => {
      console.log('SET COINS!!! 🪙')
      const coins = user?.purchased_coins?.map(coin => {
         return (
            { name: coin.name.toLowerCase(), quantity: coin.quantity }
         )
      })
      setUserCoins(coins)
   }, [user, purchasedCoins])

   console.log({ userCoins })

   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <Layout user={user} setUser={setUser}>
               <Routes>
                  <Route path='/' element={<Homepage setSelectedCoin={setSelectedCoin} />} />
                  <Route path='/trade' element={<CoinPage setUser={setUser} user={user} selectedCoin={selectedCoin} purchasedCoins={purchasedCoins} setPurchasedCoins={setPurchasedCoins} />} />
                  <Route path='/logout' />
                  <Route path='/crypto' element={<CryptoPage setSelectedCoin={setSelectedCoin} />} />
                  <Route path='/profile' element={<ProfilePage user={user} userCoins={userCoins} setSelectedCoin={setSelectedCoin} />} />
                  <Route path='/login' element={<LoginPage setUser={setUser} />} />
                  <Route path='/signup' element={<SignupPage setUser={setUser} />} />
               </Routes>
            </Layout>
         </BrowserRouter>
      </QueryClientProvider>
   );
}

export default App;
