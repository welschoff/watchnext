import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import GetPopular, {
  GetPopularProps,
} from '../../components/GetPopular/GetPopular';
import { useEffect, useState } from 'react';

function Popular() {
  const [results, setResults] = useState<GetPopularProps[] | null>([]);

  const getSeries = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/tv/popular?api_key=79f8888252c85fbe294c7596aa7067d9&page'
    );
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
