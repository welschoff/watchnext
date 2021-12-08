function useAddToWatchlist(
  series: {
    poster_path: string;
    vote_average: number;
  }[]
) {
  const username = localStorage.getItem('Current user');
  console.log(username);
  console.log({ series });

  const AddToWatchlist = async function () {
    const response = await fetch(`api/users/${username}`);
    if (response.ok) {
      console.log(`${username} exists`);
      await fetch(`/api/users/${username}`, {
        method: 'PATCH',
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
