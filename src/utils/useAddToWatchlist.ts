function useAddToWatchlist(series: {
  name: string | undefined;
  poster_path: string;
  vote_average: number;
}) {
  const username = localStorage.getItem('Current user');
  console.log(username);
  console.log({ series });

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
