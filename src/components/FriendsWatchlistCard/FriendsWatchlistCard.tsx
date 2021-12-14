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
        <span className={styles.identifier}>{id}</span>
        <h3>{name}</h3>
        <span className={styles.rating}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/1200px-Tmdb.new.logo.svg.png"
            alt=""
          />
          <span className={styles.vote}>{vote_average}</span>
        </span>
        {/* <button className={styles.remove}>
          <img src={remove} alt="" />
        </button> */}
      </section>
    </div>
  );
}

export default FriendsWatchlistCard;
