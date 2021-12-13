import styles from './Friendlist.module.css';
import Profile from '../../assets/Profile.svg';
import { FriendsPageProps } from '../../types';

function Friendlist({ username }: FriendsPageProps) {
  return (
    <div
      onClick={() => sessionStorage.setItem('activeUser', username)}
      className={styles.container}
    >
      <div className={styles.friendcard}>
        <img src={Profile} />
        <p>{username}</p>
      </div>
    </div>
  );
}

export default Friendlist;
