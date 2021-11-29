import { useEffect, useState } from 'react';
import SearchResult, {
  SearchResultProps,
} from '../../components/SearchResult/SearchResult';
import styles from './Search.module.css';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';

function Search(): JSX.Element {
  const [results, setResults] = useState<SearchResultProps[] | null>([]);
  const [query, setQuery] = useState<string | ''>('');

  // https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}

  const getSeries = async () => {
    const response = await fetch(`http://localhost:3001/api/search/${query}`);
    const data = await response.json();
    console.log(data);
    setResults(data.results);
  };

  useEffect(() => {
    getSeries();
  }, [query]);

  return (
    <div className={styles.container}>
      <OverlayMenu />
      <form className={styles.search}>
        <input
          type="search"
          placeholder="Search Series"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </form>
      <div>
        {results?.map((result) => (
          // eslint-disable-next-line react/jsx-key
          <SearchResult
            poster_path={result.poster_path}
            name={result.name}
            vote_average={result.vote_average}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
