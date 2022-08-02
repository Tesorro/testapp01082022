import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Registration from './pages/Registration';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Registration />} />
        
      </Routes>
    </>
  );
}

export default App;
