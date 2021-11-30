import styles from './DetailCard.module.css';

// export type GenreProps = {
//   name: string;
// };

export type DetailCardProps = {
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
        <img src="src/assets/rating.svg" />
        {vote_average}
      </p>
      {/* <p>{genres}</p> */}
      <button className={styles.button}>
        Add to Watchlist
        <img src="src/assets/Add.svg" />
      </button>
    </div>
  );
}

export default DetailCard;
