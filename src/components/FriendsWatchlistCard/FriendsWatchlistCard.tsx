import styles from './FriendsWatchlistCard.module.css';
import remove from '../../assets/remove.svg';
import Star from '../../assets/rating.svg';

export type FriendsWatchlistCardProps = {
  name: string;
  poster_path: string;
  vote_average: number;
  id: number;
};

function FriendsWatchlistCard({
  name,
  poster_path,
  id,
  vote_average,
}: FriendsWatchlistCardProps) {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
      />
      <section className={styles.info}>
        <div>
          <span className={styles.identifier}>{id}</span>
          <span>{name}</span>
          <span className={styles.rating}>
            <img className={styles.star} src={Star} />
            {vote_average}
          </span>
        </div>
        <button className={styles.remove}>
          <img src={remove} alt="" />
        </button>
      </section>
    </div>
  );
}

export default FriendsWatchlistCard;
