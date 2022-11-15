import { useEffect, useState } from 'react';
import Friendlist from '../../components/Friendlist/Friendlist';
import styles from './FriendsPage.module.css';
import { FriendsPageProps } from '../../types';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function FriendsPage() {
  const [friends, setFriends] = useState<FriendsPageProps[]>([]);

  const username = localStorage.getItem('Current user');

  const getFriends = async () => {
    const response = await fetch(`api/friends/${username}`);
    const data = await response.json();
    setFriends(data);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <>
      <Link to={'/friends/watchlist'}>
        <div className={styles.container}>
          {friends?.map((friend) => (
            // eslint-disable-next-line react/jsx-key
            <Friendlist username={friend.username} />
          ))}{' '}
        </div>
      </Link>
      <Navbar />
    </>
  );
}

export default FriendsPage;
