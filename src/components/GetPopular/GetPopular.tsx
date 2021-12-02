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
        <h3>{name}</h3>
        <div className={styles.rating}>
          <img src={Star} />
          {vote_average}
        </div>
      </article>
    </div>
  );
}

export default GetPopular;
