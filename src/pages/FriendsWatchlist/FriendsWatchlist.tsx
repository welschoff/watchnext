import { useEffect, useState } from 'react';
import FriendsWatchlistCard, {
  FriendsWatchlistCardProps,
} from '../../components/FriendsWatchlistCard/FriendsWatchlistCard';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';

function FriendsWatchlist() {
  const [watchlist, setWatchlist] = useState<FriendsWatchlistCardProps[]>([]);

  const friend = sessionStorage.getItem('activeUser');

  const getWatchlist = async () => {
    const response = await fetch(`/api/users/${friend}`);
    const data = await response.json();
    setWatchlist(data.watchlist);
    console.log(data.watchlist);
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <>
      <OverlayMenu />
      {watchlist &&
        watchlist.map((watchlist) => (
          <FriendsWatchlistCard
            key={watchlist.id}
            name={watchlist.name}
            poster_path={watchlist.poster_path}
            vote_average={watchlist.vote_average}
            id={watchlist.id}
          />
        ))}
    </>
  );
}
export default FriendsWatchlist;
