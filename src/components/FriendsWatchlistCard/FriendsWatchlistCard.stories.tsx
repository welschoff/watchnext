import FriendsWatchlistCard from './FriendsWatchlistCard';

export default {
  component: FriendsWatchlistCard,
  title: 'Components/FriendsWatchlistCard',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => (
  <FriendsWatchlistCard
    name=""
    poster_path=""
    vote_average={7}
    id={1}
    first_air_date=""
    genres={[]}
  />
);
