import DetailCard from '../../components/DetailCard/DetailCard';
import { ActorProps, SeriesProps } from '../../types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Actor from '../../components/Actors/Actor';
import styles from './Detail.module.css';

function Detail() {
  const { id } = useParams();
  const [series, setSeries] = useState<SeriesProps | null>(null);
  const [actors, setActors] = useState<ActorProps[]>([]);

  const getActors = async () => {
    const response = await fetch(`/api/actors/${id}`);
    const data = await response.json();
    setActors(data);
    console.log(data);
  };

  const getDetails = async () => {
    const response = await fetch(`/api/detail/${id}`);
    const data = await response.json();
    setSeries(data);
    console.log(data);
  };

  useEffect(() => {
    getActors();
    getDetails();
  }, []);

  return (
    <div className={styles.container}>
      <div>{series && <DetailCard {...series} />}</div>
      <div className={styles.actors}>
        {actors?.map((actor) => (
          // eslint-disable-next-line react/jsx-key
          <Actor
            name={actor.name}
            character={actor.character}
            profile_path={actor.profile_path}
          />
        ))}{' '}
      </div>
    </div>
  );
}

export default Detail;
