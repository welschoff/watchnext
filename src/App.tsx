import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function doFetch() {
      const response = await fetch('/api/hello');
      const result = await response.json();
      setMessage(result.message);
    }
    doFetch();
  }, []);

  return (
    <div>
      <p>Hello Vite + React!</p>
      <p>{message}</p>
    </div>
  );
}

export default App;
