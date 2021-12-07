function useAddToWatchlist(series: {
  id: number;
  poster_path: string;
  vote_average: string;
  number_of_seasons: number;
}) {
  const username = localStorage.getItem('Current user');
  const id = series.id;

  const AddToWatchlist = async function () {
    const response = await fetch(`api/users/${username}/${id}`);
    if (!response.ok) {
      console.log(`${series} already exists`);
    } else {
      await fetch('/api/users/${id}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(series),
      });
    }
  };

  return AddToWatchlist;
}

export default useAddToWatchlist;
