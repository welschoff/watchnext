import styles from './Friendlist.module.css';
import Profile from '../../assets/Profile.svg';
import { FriendsPageProps } from '../../types';

function Friendlist({ username }: FriendsPageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.friendcard}>
        <img src={Profile} />
        <p>{username}</p>
      </div>
      {/* <div className={styles.friendcard}>
        <img src={Profile} alt="" />
        <p>David</p>
      </div>
      <div className={styles.friendcard}>
        <img src={Profile} alt="" />
        <p>David</p>
      </div>
      <div className={styles.friendcard}>
        <img src={Profile} alt="" />
        <p>David</p>
      </div>
      <div className={styles.friendcard}>
        <img src={Profile} alt="" />
        <p>David</p>
      </div> */}
    </div>
  );
}

export default Friendlist;
