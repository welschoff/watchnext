import styles from './WatchlistCard.module.css';
import Star from '../../assets/rating.svg';
import { DetailCardProps } from '../../types';

function WatchlistCard({ poster_path, vote_average }: DetailCardProps) {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="Poster"
      />
      <section className={styles.info}>
        <span className={styles.rating}>
          <img className={styles.star} src={Star} />
          {vote_average}
        </span>
      </section>
    </div>
  );
}

export default WatchlistCard;
