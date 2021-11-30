import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import GetPopular, {
  GetPopularProps,
} from '../../components/GetPopular/GetPopular';
import { useEffect, useState } from 'react';

function Popular() {
  const [results, setResults] = useState<GetPopularProps[] | null>([]);

  const getSeries = async () => {
    const response = await fetch('http://localhost:3001/api/popular/');
    const data = await response.json();
    console.log(data);
    setResults(data.results);
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <section>
      <OverlayMenu />
      <div>
        {results?.map((result) => (
          // eslint-disable-next-line react/jsx-key
          <GetPopular
            poster_path={result.poster_path}
            name={result.name}
            vote_average={result.vote_average}
          />
        ))}
      </div>
    </section>
  );
}

export default Popular;
