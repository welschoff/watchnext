import styles from './Detail.module.css';
import DetailCard, {
  DetailCardProps,
} from '../../components/DetailCard/DetailCard';
import { useEffect, useState } from 'react';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';

function Detail() {
  const [series, setSeries] = useState<DetailCardProps | null>(null);

  const getDetails = async () => {
    const response = await fetch('http://localhost:3001/api/details');
    const data = await response.json();
    setSeries(data);
  };

  // console.log(series?.genres[0].name);

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <OverlayMenu />
      <div className={styles.detail}>
        {series && (
          <DetailCard
            poster_path={series.poster_path}
            overview={series.overview}
            vote_average={series.vote_average}
            // genres={series.genres[0].name}
          />
        )}
      </div>
    </div>
  );
}

export default Detail;