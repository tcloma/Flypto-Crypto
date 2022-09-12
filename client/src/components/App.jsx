import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from "react";
import Homepage from './Homepage';
import Layout from './Layout';
import CoinPage from './CoinPage'
import '../styles/App.scss';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProfilePage from './ProfilePage';

const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/trade' element={<CoinPage />} />
            <Route path='/crypto' />
            <Route path='/profile' element={<ProfilePage />}/>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
          <ReactQueryDevtools />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
