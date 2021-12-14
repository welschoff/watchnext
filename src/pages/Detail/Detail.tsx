import DetailCard from '../../components/DetailCard/DetailCard';
import { DetailCardProps } from '../../types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [series, setSeries] = useState<DetailCardProps | null>(null);

  const getDetails = async () => {
    const response = await fetch(`/api/detail/${id}`);
    const data = await response.json();
    setSeries(data);
    console.log(data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <div>
        {series && (
          <DetailCard
            poster_path={series.poster_path}
            overview={series.overview}
            vote_average={series.vote_average}
            name={series.name}
            id={series.id}
          />
        )}
      </div>
    </div>
  );
}

export default Detail;
