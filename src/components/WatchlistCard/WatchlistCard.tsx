import styles from './WatchlistCard.module.css';
import Star from '../../assets/rating.svg';
import { DetailCardProps } from '../../types';
import useDeleteFromWatchlist from '../../utils/useDeleteFromWatchlist';
import { FormEvent } from 'react';
import remove from '../../assets/remove.svg';

function WatchlistCard({ poster_path, vote_average, name }: DetailCardProps) {
  const series = {
    poster_path,
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
        alt="Poster"
      />
      <section className={styles.info}>
        <div>
          <span>{name}</span>
          <span className={styles.rating}>
            <img className={styles.star} src={Star} />
            {vote_average}
          </span>
        </div>
        <button className={styles.remove} onClick={handleClick}>
          <img src={remove} alt="" />
        </button>
      </section>
    </div>
  );
}

export default WatchlistCard;
