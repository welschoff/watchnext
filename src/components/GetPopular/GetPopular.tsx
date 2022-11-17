import styles from './GetPopular.module.css';
import { FaStar } from 'react-icons/fa';
import { SeriesProps } from '../../types';

function GetPopular({
  poster_path,
  name,
  overview,
  vote_average,
}: SeriesProps) {
  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`Cover of ${name}`}
      />
      <div className={styles.info}>
        <div>
          <h3>{name}</h3>
          <p>{overview}</p>
        </div>
        <div className={styles.rating}>
          <FaStar size={17} style={{ color: 'gold' }} />
          <span>{vote_average}</span>
        </div>
        {/* <p className={styles.overview}>{overview}</p> */}
      </div>
    </div>
  );
}

export default GetPopular;
