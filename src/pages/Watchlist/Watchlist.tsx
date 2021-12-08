import { useEffect, useState } from 'react';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard';
import { DetailCardProps } from '../../types';

function Watchlist() {
  const [series, setSeries] = useState<DetailCardProps[]>([]);

  const username = localStorage.getItem('Current user');
  console.log({ username });

  const getDetails = async () => {
    const response = await fetch(`/api/users/${username}`);
    const data = await response.json();
    setSeries(data.watchlist);
    console.log({ data });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <OverlayMenu />
      <div>
        {series?.map((serie) => (
          // eslint-disable-next-line react/jsx-key
          <WatchlistCard
            poster_path={serie.poster_path}
            vote_average={serie.vote_average}
          />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
