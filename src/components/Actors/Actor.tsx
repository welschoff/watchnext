import { ActorProps } from '../../types';
import styles from './Actor.module.css';

function Actors({ character, name, profile_path }: ActorProps) {
  return (
    <div className={profile_path !== null ? styles.actor : styles.display_none}>
      <img
        className={styles.profile}
        src={`https://image.tmdb.org/t/p/w200${profile_path}`}
      />
      <h4>{character}</h4>
      <span>{name}</span>
    </div>
  );
}

export default Actors;
