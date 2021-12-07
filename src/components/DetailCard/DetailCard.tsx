import styles from './DetailCard.module.css';
import Add from '../../assets/Add.svg';
import Star from '../../assets/rating.svg';

// export type GenreProps = {
//   name: string;
// };

export type DetailCardProps = {
  id?: number;
  poster_path: object;
  overview: string;
  vote_average: number;
  //   genres: GenreProps[];
};

function DetailCard({
  poster_path,
  overview,
  vote_average,
}: //   genres,
DetailCardProps) {
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
      {/* <p>{genres}</p> */}
      <button className={styles.button}>
        Add to Watchlist
        <img src={Add} />
      </button>
    </div>
  );
}

export default DetailCard;
