import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import GetPopular, {
  GetPopularProps,
} from '../../components/GetPopular/GetPopular';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Popular.module.css';
import { OverlayMenuProps } from '../../components/OverlayMenu/OverlayMenu';

function Popular() {
  const [results, setResults] = useState<GetPopularProps[] | null>([]);

  const getSeries = async () => {
    const response = await fetch('/api/popular');
    const data = await response.json();
    console.log(data);
    setResults(data.results);
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <section>
      <OverlayMenu title="Popular" />
      <div className={styles.container}>
        {results?.map((result) => (
          <Link
            style={{ textDecoration: 'none' }}
            key={result.id}
            to={`/popular/${result.id}`}
          >
            <GetPopular
              poster_path={result.poster_path}
              name={result.name}
              vote_average={result.vote_average}
              // overview={result.overview}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Popular;
