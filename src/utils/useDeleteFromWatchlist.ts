function useDeleteFromWatchlist(series: { poster_path: string }) {
  const username = localStorage.getItem('Current user');

  const DeleteFromWatchlist = async function () {
    await fetch(`/api/users/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(series),
    });
    console.log('deleted');
  };

  return DeleteFromWatchlist;
}

export default useDeleteFromWatchlist;
