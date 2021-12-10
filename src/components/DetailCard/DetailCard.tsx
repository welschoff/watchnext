import styles from './DetailCard.module.css';
import Star from '../../assets/rating.svg';
import { DetailCardProps } from '../../types';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent } from 'react';
import AddButton from '../AddButton/AddButton';

function DetailCard({
  poster_path,
  overview,
  vote_average,
  name,
  id,
}: DetailCardProps) {
  const series = {
    name,
    vote_average,
    poster_path,
    id,
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
        <p className={styles.identifier}>{id}</p>
      </article>
      <p className={styles.rating}>
        <img src={Star} />
        {vote_average}
      </p>
      <div className={styles.heart} onClick={handleClick}>
        <AddButton />
      </div>
    </div>
  );
}

export default DetailCard;
