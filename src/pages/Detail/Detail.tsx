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
      <div>{series && <DetailCard {...series} />}</div>
    </div>
  );
}

export default Detail;
