import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import People from './pages/People';
import Profile from './pages/Profile';
import UserInfo from './pages/UserInfo';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/people' element={<People />} />
        <Route path='/user/:id' element={<UserInfo />} />
      </Routes>
    </>
  );
}

export default App;
