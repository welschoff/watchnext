import styles from './DetailCard.module.css';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent, useEffect, useState } from 'react';
import AddButton from '../AddButton/AddButton';
import star from '../../assets/rating.svg';
import back from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';
import useDeleteFromWatchlist from '../../utils/useDeleteFromWatchlist';
import OverlayMenu from '../OverlayMenu/OverlayMenu';

export type GenreProps = {
  name: string;
};

export type DetailCardProps = {
  id?: number;
  name?: string;
  poster_path: string;
  overview?: string;
  vote_average: number;
  first_air_date?: string;
  genres: GenreProps[];
  saved: boolean;
};

function DetailCard({
  poster_path,
  overview,
  vote_average,
  name,
  id,
  first_air_date,
  genres,
  saved,
}: DetailCardProps) {
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [added, setAdded] = useState<true | false>(false);
  const navigate = useNavigate();

  const series = {
    name,
    vote_average,
    poster_path,
    id,
    first_air_date,
    genres,
    saved: true,
  };
  const AddToWatchlist = useAddToWatchlist(series);

  const add = async function (event: FormEvent) {
    event.preventDefault();
    await AddToWatchlist();
    setAdded(true);
  };

  if (saved) {
    setAdded(true);
  }

  const DeleteFromWatchlist = useDeleteFromWatchlist(series);

  const remove = async function (event: FormEvent) {
    event.preventDefault();
    await DeleteFromWatchlist();
    setAdded(false);
  };

  useEffect(() => {
    if (first_air_date) {
      const newDate = new Date(first_air_date);
      setReleaseDate(newDate);
    }
  }, []);

  return (
    <main className={styles.container}>
      <div>
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
      </div>
      <div>
        <article className={styles.info}>
          <div className={styles.title}>
            <div>
              <h2>
                {name}&nbsp;({releaseDate?.getFullYear()})
              </h2>
              <span></span>
            </div>
            <div className={styles.heart} onClick={added ? remove : add}>
              <AddButton />
            </div>
          </div>
          <span className={styles.genres}>
            Genre:<br></br>
            {genres[0].name}
          </span>
          <p>{overview}</p>
          <div className={styles.rating}>
            <img src={star} />
            <span>{vote_average}</span>
          </div>
          <p className={styles.identifier}>{id}</p>
        </article>
      </div>
    </main>
  );
}

export default DetailCard;
