import { useEffect, useState } from 'react';
import Friendlist from '../../components/Friendlist/Friendlist';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import styles from './FriendsPage.module.css';
import { FriendsPageProps } from '../../types';
import { Link } from 'react-router-dom';

function FriendsPage() {
  const [friends, setFriends] = useState<FriendsPageProps[]>([]);
  //   const [watchlist, setWatchlist] = useState<FriendsWatchlistCardProps[]>([]);

  const username = localStorage.getItem('Current user');

  const getFriends = async () => {
    const response = await fetch(`api/friends/${username}`);
    const data = await response.json();
    setFriends(data);
  };

  useEffect(() => {
    getFriends();
  }, []);

  //   const friend = sessionStorage.getItem('activeUser');

  //   const getWatchlist = async () => {
  //     const response = await fetch(`/api/users/${friend}`);
  //     const data = await response.json();
  //     setWatchlist(data.watchlist);
  //     console.log(data.watchlist);
  //   };

  return (
    <>
      <OverlayMenu title="Friends" />
      <Link to={'/friends/watchlist'}>
        <div className={styles.container}>
          {friends?.map((friend) => (
            // eslint-disable-next-line react/jsx-key
            <Friendlist username={friend.username} />
          ))}{' '}
        </div>
      </Link>
      {/* {watchlist &&
          watchlist.map((watchlist) => (
            <FriendsWatchlistCard
              key={watchlist.id}
              name={watchlist.name}
              poster_path={watchlist.poster_path}
              vote_average={watchlist.vote_average}
              id={watchlist.id}
            />
          ))} */}
    </>
  );
}

export default FriendsPage;
