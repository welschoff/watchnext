import { useEffect, useState } from 'react';
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard';
import { WatchlistCardProps } from '../../components/WatchlistCard/WatchlistCard';

function Watchlist() {
  const [series, setSeries] = useState<WatchlistCardProps | null>(null);

  const getDetails = async () => {
    const response = await fetch('/api/detail/90461');
    const data = await response.json();
    setSeries(data);
    console.log(data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      {series && (
        <WatchlistCard
          poster_path={series.poster_path}
          vote_average={series.vote_average}
          number_of_seasons={series.number_of_seasons}
        />
      )}
    </div>
  );
}

export default Watchlist;
