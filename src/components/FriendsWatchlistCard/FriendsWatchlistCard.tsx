import styles from './FriendsWatchlistCard.module.css';
import Star from '../../assets/rating.svg';
import { useEffect, useState } from 'react';
import { SeriesProps } from '../../types';

function FriendsWatchlistCard({
  name,
  poster_path,
  id,
  vote_average,
  first_air_date,
  genres,
}: SeriesProps) {
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);

  useEffect(() => {
    if (first_air_date) {
      const newDate = new Date(first_air_date);
      setReleaseDate(newDate);
    }
  }, []);
  return (
    <div className={styles.container}>
      <span className={styles.identifier}>{id}</span>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
      />
      <section className={styles.info}>
        <div className={styles.title}>
          <h3>
            {name}{' '}
            <span className={styles.date}>({releaseDate?.getFullYear()})</span>
          </h3>
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

export default FriendsWatchlistCard;
