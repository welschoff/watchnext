import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={`${watchlist.id}`} key={watchlist.id}>
            <FriendsWatchlistCard
              key={watchlist.id}
              name={watchlist.name}
              poster_path={watchlist.poster_path}
              vote_average={watchlist.vote_average}
              id={watchlist.id}
              first_air_date={watchlist.first_air_date}
              genres={watchlist.genres}
            />
          </Link>
        ))}
    </>
  );
}
export default FriendsWatchlist;
