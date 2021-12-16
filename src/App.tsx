import { Route, Routes } from 'react-router-dom';
import Detail from './pages/Detail/Detail';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import FriendsWatchlist from './pages/FriendsWatchlist/FriendsWatchlist';
import Login from './pages/LoginPage/Login';
import Popular from './pages/Popular/Popular';
import Search from './pages/Search/Search';
import Watchlist from './pages/Watchlist/Watchlist';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/popular/:id" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<Detail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/watchlist/:id" element={<Detail />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/friends/watchlist" element={<FriendsWatchlist />} />
        <Route path="/friends/watchlist/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
