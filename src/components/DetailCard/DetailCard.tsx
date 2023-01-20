import styles from './DetailCard.module.css';
import useAddToWatchlist from '../../utils/useAddToWatchlist';
import { FormEvent, useEffect, useState } from 'react';
import AddButton from '../AddButton/AddButton';
import { useNavigate } from 'react-router-dom';
import useDeleteFromWatchlist from '../../utils/useDeleteFromWatchlist';
import { SeriesProps } from '../../types';
import Trailer from '../Trailer/Trailer';
import { IoChevronBack } from 'react-icons/io5';
import Navbar from '../Navbar/Navbar';
import { FaStar } from 'react-icons/fa';

function DetailCard({
  poster_path,
  overview,
  vote_average,
  name,
  id,
  first_air_date,
  genres,
}: SeriesProps) {
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [added, setAdded] = useState<true | false>(false);
  const [trailerId, setTrailerId] = useState<string>('');
  const navigate = useNavigate();

  const getTrailer = async () => {
    const response = await fetch(`/api/videos/${id}`);
    const data = await response.json();
    setTrailerId(data.results[0].key);
    console.log(data);
  };

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
    getTrailer();
  }, []);

  return (
    <>
      <main className={styles.container}>
        <div className={styles.header}>
          <IoChevronBack size={25} />
          <span>
            {name}{' '}
            {/* <span className={styles.date}>({releaseDate?.getFullYear()})</span> */}
          </span>
        </div>
        <div>
          <h2>{name}</h2>
          <span>TV Show {releaseDate?.getFullYear()}</span>
        </div>
        <Trailer trailerId={trailerId} />
        <div className={styles.cover}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            className={styles.image}
          />

          <div className={styles.genres}>
            {genres && genres.length > 0 ? (
              genres.map((obj, index) => (
                <div className={styles.genre} key={index}>
                  {obj.name}
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
          <p className={styles.overview}>{overview}</p>
        </div>
        <div className={styles.rating}>
          <FaStar style={{ color: 'gold' }} />
          <span>{vote_average?.toFixed(1)}</span>
        </div>
        <div>
          <article className={styles.info}>
            <div className={styles.title}>
              <div>
                <span></span>
              </div>
              <div className={styles.heart} onClick={added ? remove : add}>
                <AddButton />
              </div>
            </div>

            <p className={styles.identifier}>{id}</p>
          </article>
        </div>
        <Navbar />
      </main>{' '}
    </>
  );
}

export default DetailCard;
