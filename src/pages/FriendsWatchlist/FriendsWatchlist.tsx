import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FriendsWatchlistCard, {
  FriendsWatchlistCardProps,
} from '../../components/FriendsWatchlistCard/FriendsWatchlistCard';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import styles from './FriendsWatchlist.module.css';

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
      <div className={styles.container}>
        {watchlist &&
          watchlist.map((watchlist) => (
            <Link to={`${watchlist.id}`} key={watchlist.id}>
              <FriendsWatchlistCard {...watchlist} />
            </Link>
          ))}
      </div>
    </>
  );
}
export default FriendsWatchlist;
