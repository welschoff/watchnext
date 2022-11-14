import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import GetPopular from '../../components/GetPopular/GetPopular';
import { Key, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Popular.module.css';
import useBookSearch from './useGetPopular';
import Navbar from '../../components/Navbar/Navbar';

function Popular() {
  const [pageNumber, setPageNumber] = useState(1);

  const { results, hasMore, loading, error } = useBookSearch(pageNumber);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <section>
      <div className={styles.container}>
        {results.map(
          (
            result: {
              id: Key | null | undefined;
              poster_path: object;
              name: string;
              vote_average: number;
            },
            index
          ) => {
            if (results.length === index + 1) {
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  key={result.id}
                  to={`/popular/${result.id}`}
                  ref={lastElementRef}
                >
                  <GetPopular
                    poster_path={result.poster_path}
                    name={result.name}
                    vote_average={result.vote_average}
                  />
                </Link>
              );
            } else {
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  key={result.id}
                  to={`/popular/${result.id}`}
                >
                  <GetPopular
                    poster_path={result.poster_path}
                    name={result.name}
                    vote_average={result.vote_average}
                  />
                </Link>
              );
            }
          }
        )}
      </div>
      <div>{error && 'Error'}</div>
      <Navbar />
    </section>
  );
}

export default Popular;
