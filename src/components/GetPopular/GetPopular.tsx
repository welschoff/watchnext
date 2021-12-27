import styles from './GetPopular.module.css';
import Star from '../../assets/rating.svg';

export type GetPopularProps = {
  poster_path: object;
  name: string;
  vote_average: number;
  id?: number;
};

function GetPopular({ poster_path, name, vote_average }: GetPopularProps) {
  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`Cover of ${name}`}
      />
      <article className={styles.info}>
        <span>{name}</span>
        <span className={styles.rating}>
          <img className={styles.star} src={Star} />
          {vote_average}
        </span>
        {/* <p className={styles.overview}>{overview}</p> */}
      </article>
    </div>
  );
}

export default GetPopular;
