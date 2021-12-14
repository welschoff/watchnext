import styles from './DetailCard.module.css';
import { DetailCardProps } from '../../types';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent } from 'react';
import AddButton from '../AddButton/AddButton';
import tmdb from '../../assets/tmdb.png';

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
    <main className={styles.container}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          className={styles.image}
        />
      </div>

      <article className={styles.overview}>
        <h2>Story</h2>
        <p>
          {overview}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
          illo eum, reiciendis consectetur minus accusamus optio molestias
          magnam, a porro quas animi neque suscipit! Ipsum nam sed consequatur
          officiis error.
        </p>
        <p className={styles.identifier}>{id}</p>
        <p className={styles.rating}>
          <img src={tmdb} />
          {vote_average}
        </p>
        <div className={styles.heart} onClick={handleClick}>
          <AddButton />
        </div>
      </article>
    </main>
  );
}

export default DetailCard;
