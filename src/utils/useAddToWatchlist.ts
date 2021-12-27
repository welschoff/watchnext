import { SeriesProps } from '../types';

function useAddToWatchlist(series: SeriesProps) {
  const username = localStorage.getItem('Current user');

  const AddToWatchlist = async function () {
    await fetch(`/api/users/${username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(series),
    });
    console.log('added');
  };

  return AddToWatchlist;
}

export default useAddToWatchlist;
