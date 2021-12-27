import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard';
import { SeriesProps } from '../../types';
import styles from './Watchlist.module.css';

function Watchlist() {
  const [series, setSeries] = useState<SeriesProps[]>([]);

  const username = localStorage.getItem('Current user');

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();
      const sortArray = await data.watchlist.sort(
        (a: { vote_average: number }, b: { vote_average: number }) => {
          return b.vote_average - a.vote_average;
        }
      );
      setSeries(sortArray);
    };
    getDetails();
  }, []);

  return (
    <div>
      <OverlayMenu title="Watchlist" />
      <div className={styles.container}>
        {series?.map((serie) => (
          <Link
            style={{ textDecoration: 'none' }}
            to={`/watchlist/${serie.id}`}
            key={serie.name}
          >
            <WatchlistCard {...serie} />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Watchlist;
