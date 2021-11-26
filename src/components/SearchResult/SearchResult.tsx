import styles from './SearchResult.module.css';

export type SearchResultProps = {
  poster_path: object;
  name: string;
  vote_average: number;
};

function SearchResult({
  name,
  poster_path,
  vote_average,
}: SearchResultProps): JSX.Element {
  if (name) {
    return (
      <div className={styles.container}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="Cover"
        />
        <article className={styles.info}>
          <h3>{name}</h3>
          <div className={styles.rating}>
            <svg
              className={styles.star}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3536 7.04257L13.358 6.1301L10.6778 0.440169C10.6046 0.284382 10.4841 0.158269 10.3354 0.0816119C9.96227 -0.111267 9.50887 0.0494654 9.32232 0.440169L6.64213 6.1301L0.646516 7.04257C0.481218 7.0673 0.330088 7.1489 0.214379 7.27254C0.0744931 7.4231 -0.00259025 7.62566 6.6464e-05 7.8357C0.00272317 8.04575 0.0849026 8.2461 0.228547 8.39272L4.56645 12.8215L3.5416 19.0753C3.51757 19.2207 3.53294 19.3704 3.58598 19.5071C3.63901 19.6439 3.72759 19.7624 3.84166 19.8492C3.95573 19.9359 4.09074 19.9875 4.23137 19.998C4.37199 20.0085 4.51262 19.9775 4.63729 19.9086L10 16.9561L15.3628 19.9086C15.5092 19.9902 15.6792 20.0174 15.8422 19.9877C16.2531 19.9135 16.5293 19.5055 16.4585 19.0753L15.4336 12.8215L19.7715 8.39272C19.8896 8.27156 19.9675 8.1133 19.9912 7.9402C20.0549 7.50746 19.7668 7.10686 19.3536 7.04257V7.04257Z"
                fill="#FFC700"
              />
            </svg>
            {vote_average}
          </div>
        </article>
      </div>
    );
  } else return <p>Search</p>;
}

export default SearchResult;
