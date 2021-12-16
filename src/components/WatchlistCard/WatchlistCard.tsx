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
          <h3>{name}</h3>
          <div className={styles.button} onClick={handleClick}>
            <RemoveButton />
          </div>
          <span>({releaseDate?.getFullYear()})</span>
        </div>
        <span className={styles.genres}>
          Genre:<br></br>
          {genres[0].name}
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
