import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard';
import { DetailCardProps } from '../../types';

function Watchlist() {
  const [series, setSeries] = useState<DetailCardProps[]>([]);

  const username = localStorage.getItem('Current user');
  console.log({ username });

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
      <OverlayMenu />
      <div>
        {series?.map((serie) => (
          <Link
            style={{ textDecoration: 'none' }}
            to={`/watchlist/${serie.id}`}
            key={serie.name}
          >
            <WatchlistCard
              name={serie.name}
              poster_path={serie.poster_path}
              vote_average={serie.vote_average}
              id={serie.id}
              overview={serie.overview}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Watchlist;
