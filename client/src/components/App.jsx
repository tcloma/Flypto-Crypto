import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';
import Layout from './Layout';
import '../styles/App.scss';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
