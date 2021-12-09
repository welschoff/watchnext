import styles from './DetailCard.module.css';
import Add from '../../assets/Add.svg';
import Star from '../../assets/rating.svg';
import { DetailCardProps } from '../../types';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent } from 'react';

function DetailCard({ poster_path, overview, vote_average }: DetailCardProps) {
  const series = {
    vote_average,
    poster_path,
  };
  console.log({ series });
  const AddToWatchlist = useAddToWatchlist(series);

  const handleClick = async function (event: FormEvent) {
    event.preventDefault();
    await AddToWatchlist();
  };

  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        className={styles.image}
      />
      <article className={styles.overview}>
        <h2>Story</h2>
        <p>{overview}</p>
      </article>
      <p className={styles.rating}>
        <img src={Star} />
        {vote_average}
      </p>
      <button className={styles.button} onClick={handleClick}>
        Add to Watchlist
        <img src={Add} />
      </button>
    </div>
  );
}

export default DetailCard;
