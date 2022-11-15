import { useEffect, useState } from 'react';
import SearchResult from '../../components/SearchResult/SearchResult';
import styles from './Search.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { SeriesProps } from '../../types';

function Search(): JSX.Element {
  const [results, setResults] = useState<SeriesProps[] | null>([]);
  const [query, setQuery] = useState<string | ''>('');

  const getSeries = async () => {
    const response = await fetch(`/api/search/${query}`);
    const data = await response.json();
    console.log(data);
    setResults(data.results);
  };

  useEffect(() => {
    setTimeout(() => {
      getSeries();
    }, 300);
  }, [query]);

  return (
    <>
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
        {query &&
          results?.map((result) => (
            // eslint-disable-next-line react/jsx-key
            <Link to={`/search/${result.id}`} key={result.id}>
              <SearchResult
                poster_path={result.poster_path}
                name={result.name}
                vote_average={result.vote_average}
                first_air_date={result.first_air_date}
              />
            </Link>
          ))}
      </div>
      <Navbar />
    </>
  );
}

export default Search;
