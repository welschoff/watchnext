import { useEffect, useState } from 'react';
import Friendlist from '../../components/Friendlist/Friendlist';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import styles from './FriendsPage.module.css';
import { FriendsPageProps } from '../../types';

function FriendsPage() {
  const [friends, setFriends] = useState<FriendsPageProps[]>([]);

  const username = localStorage.getItem('Current user');

  const getFriends = async () => {
    const response = await fetch(`api/friends/${username}`);
    const data = await response.json();
    console.log(data);
    setFriends(data);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <>
      <OverlayMenu />
      <div className={styles.container}>
        {friends?.map((friend) => (
          // eslint-disable-next-line react/jsx-key
          <Friendlist username={friend.username} />
        ))}
      </div>
    </>
  );
}

export default FriendsPage;
