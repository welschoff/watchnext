import styles from './WatchlistCard.module.css';
import Star from '../../assets/rating.svg';
import { WatchlistProps } from '../../utils/useAddToWatchlist';
import useDeleteFromWatchlist from '../../utils/useDeleteFromWatchlist';
import { FormEvent, useEffect, useState } from 'react';
import RemoveButton from '../RemoveButton/RemoveButton';

function WatchlistCard({
  poster_path,
  vote_average,
  name,
  id,
  first_air_date,
  genres,
}: WatchlistProps) {
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);

  useEffect(() => {
    if (first_air_date) {
      const newDate = new Date(first_air_date);
      setReleaseDate(newDate);
    }
  }, []);

  const series = {
    poster_path,
    vote_average,
    id,
    name,
  };

  const DeleteFromWatchlist = useDeleteFromWatchlist(series);

  const handleClick = async function (event: FormEvent) {
    event.preventDefault();
    await DeleteFromWatchlist();
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
      />
      <section className={styles.info}>
        <div className={styles.title}>
          <span className={styles.identifier}>{id}</span>
          <div>
            <h3>
              {name}{' '}
              <span className={styles.date}>
                ({releaseDate?.getFullYear()})
              </span>
            </h3>
          </div>
          <div className={styles.button} onClick={handleClick}>
            <RemoveButton />
          </div>
        </div>
        <span className={styles.genre}>
          <span>Genre:</span>
          <span>{genres[0].name}</span>
        </span>
        <div className={styles.rating}>
          <img className={styles.star} src={Star} />
          <span>{vote_average}</span>
        </div>
      </section>
    </div>
  );
}

export default WatchlistCard;
