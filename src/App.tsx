import { Route, Routes, useLocation } from 'react-router-dom';
import Detail from './pages/Detail/Detail';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import FriendsWatchlist from './pages/FriendsWatchlist/FriendsWatchlist';
import Login from './pages/LoginPage/Login';
import Popular from './pages/Popular/Popular';
import Search from './pages/Search/Search';
import Watchlist from './pages/Watchlist/Watchlist';
import { useTransition, animated } from 'react-spring';

function App() {
  const location = useLocation();

  const transitions = useTransition(location, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-100%)' },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <Routes location={item}>
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
    </animated.div>
  ));
}

export default App;
