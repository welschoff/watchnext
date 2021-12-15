import styles from './DetailCard.module.css';
import { DetailCardProps } from '../../types';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent, useEffect, useState } from 'react';
import AddButton from '../AddButton/AddButton';
import tmdb from '../../assets/tmdb.png';
import OverlayMenu from '../OverlayMenu/OverlayMenu';
import star from '../../assets/rating.svg';
import back from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';

function DetailCard({
  poster_path,
  overview,
  vote_average,
  name,
  id,
  first_air_date,
}: DetailCardProps) {
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const series = {
    name,
    vote_average,
    poster_path,
    id,
  };
  console.log({ series });
  const AddToWatchlist = useAddToWatchlist(series);

  const handleClick = async function (event: FormEvent) {
    event.preventDefault();
    await AddToWatchlist();
  };

  useEffect(() => {
    if (first_air_date) {
      const newDate = new Date(first_air_date);
      setReleaseDate(newDate);
    }
  }, []);

  return (
    <main className={styles.container}>
      <img
        onClick={() => navigate(-1)}
        className={styles.back}
        src={back}
        alt=""
      />
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        className={styles.image}
      />
      <article className={styles.info}>
        <div className={styles.title}>
          <h2>{name}</h2>

          <div className={styles.heart} onClick={handleClick}>
            <AddButton />
          </div>

          <span>({releaseDate?.getFullYear()})</span>
        </div>
        <p>{overview}</p>
        <div className={styles.rating}>
          <img src={star} />
          <span>{vote_average}</span>
        </div>
        <p className={styles.identifier}>{id}</p>
      </article>
    </main>
  );
}

export default DetailCard;
