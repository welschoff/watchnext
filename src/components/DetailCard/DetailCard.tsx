import styles from './DetailCard.module.css';
import Star from '../../assets/rating.svg';
import { DetailCardProps } from '../../types';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent } from 'react';
import Heart from '../../assets/heart.svg';

function DetailCard({
  poster_path,
  overview,
  vote_average,
  name,
}: DetailCardProps) {
  const series = {
    name,
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
      <button className={styles.heart} onClick={handleClick}>
        <img src={Heart} />
      </button>
    </div>
  );
}

export default DetailCard;
