import styles from './SearchResult.module.css';
import Star from '../../assets/rating.svg';

export type SearchResultProps = {
  poster_path: object;
  name: string;
  vote_average: number;
  id?: number;
};

function SearchResult({
  name,
  poster_path,
  vote_average,
}: SearchResultProps): JSX.Element {
  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`Cover of ${name}`}
      />
      <article className={styles.info}>
        <h3>{name}</h3>
        <div className={styles.rating}>
          <img className={styles.star} src={Star} alt="" />
          <span> {vote_average} </span>
        </div>
      </article>
    </div>
  );
}

export default SearchResult;
