import styles from './SearchResult.module.css';
import Star from '../../assets/rating.svg';
import { useEffect, useState } from 'react';
import { SeriesProps } from '../../types';

function SearchResult({
  name,
  poster_path,
  vote_average,
  first_air_date,
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
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`Cover of ${name}`}
      />
      <article className={styles.info}>
        <h3>
          {name}{' '}
          <span className={styles.date}>({releaseDate?.getFullYear()})</span>
        </h3>
        <div className={styles.rating}>
          <img className={styles.star} src={Star} alt="" />
          <span> {vote_average} </span>
        </div>
      </article>
    </div>
  );
}

export default SearchResult;
