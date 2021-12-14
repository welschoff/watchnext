import styles from './DetailCard.module.css';
import { DetailCardProps } from '../../types';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent, useEffect, useState } from 'react';
import AddButton from '../AddButton/AddButton';
import tmdb from '../../assets/tmdb.png';
import OverlayMenu from '../OverlayMenu/OverlayMenu';

function DetailCard({
  poster_path,
  overview,
  vote_average,
  name,
  id,
  first_air_date,
}: DetailCardProps) {
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);

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
    <>
      <OverlayMenu />
      <main className={styles.container}>
        <header className={styles.header}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            className={styles.image}
          />
          <div className={styles.title}>
            <h2>{name}</h2>
            <span className={styles.year}>({releaseDate?.getFullYear()})</span>
            <div>
              <span className={styles.rating}>
                <img src={tmdb} />
                {vote_average}
              </span>
            </div>
          </div>
          <div className={styles.heart} onClick={handleClick}>
            <AddButton />
          </div>
        </header>

        <article className={styles.info}>
          <p>{overview}</p>
          <p className={styles.identifier}>{id}</p>
        </article>
      </main>
    </>
  );
}

export default DetailCard;
