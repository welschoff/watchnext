import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FriendsWatchlistCard from '../../components/FriendsWatchlistCard/FriendsWatchlistCard';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import styles from './FriendsWatchlist.module.css';
import { SeriesProps } from '../../types';

function FriendsWatchlist() {
  const [watchlist, setWatchlist] = useState<SeriesProps[]>([]);

  const friend = sessionStorage.getItem('activeUser');

  useEffect(() => {
    const getWatchlist = async () => {
      const response = await fetch(`/api/users/${friend}`);
      const data = await response.json();
      const sortArray = await data.watchlist.sort(
        (a: { vote_average: number }, b: { vote_average: number }) => {
          return b.vote_average - a.vote_average;
        }
      );
      setWatchlist(sortArray);
    };
    getWatchlist();
  }, []);

  return (
    <>
      <OverlayMenu title={`${friend}'s Watchlist`} />
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
