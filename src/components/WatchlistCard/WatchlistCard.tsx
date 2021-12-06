import styles from './WatchlistCard.module.css';
import Star from '../../assets/rating.svg';

export type WatchlistCardProps = {
  id?: number;
  poster_path: string;
  vote_average: number;
  number_of_seasons: number;
};

function WatchlistCard({
  poster_path,
  vote_average,
  number_of_seasons,
}: WatchlistCardProps) {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt=""
      />
      <section className={styles.info}>
        <span className={styles.rating}>
          <img className={styles.star} src={Star} alt="" />
          {vote_average}
        </span>
        <span>Seasons {number_of_seasons}</span>
        <span>Seen ?/{number_of_seasons}</span>
      </section>
    </div>
  );
}

export default WatchlistCard;
