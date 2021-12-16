import styles from './FriendsWatchlistCard.module.css';
import Star from '../../assets/rating.svg';
import { useEffect, useState } from 'react';
import { GenreProps } from '../../utils/useAddToWatchlist';

export type FriendsWatchlistCardProps = {
  name: string;
  poster_path: string;
  vote_average: number;
  id: number;
  first_air_date: string;
  genres: GenreProps[];
};

function FriendsWatchlistCard({
  name,
  poster_path,
  id,
  vote_average,
  first_air_date,
  genres,
}: FriendsWatchlistCardProps) {
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);

  useEffect(() => {
    if (first_air_date) {
      const newDate = new Date(first_air_date);
      setReleaseDate(newDate);
    }
  }, []);
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
          <span>({releaseDate?.getFullYear()})</span>
        </div>
        <span>{genres}</span>
        <div className={styles.rating}>
          <img className={styles.star} src={Star} />
          <span>{vote_average}</span>
          <span>{id}</span>
        </div>
      </section>
    </div>
  );
}

export default FriendsWatchlistCard;
