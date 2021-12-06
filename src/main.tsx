import { render } from 'react-dom';
import './globals.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Popular from './pages/Popular/Popular';
import Search from './pages/Search/Search';
import Detail from './pages/Detail/Detail';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/popular/:id" element={<Detail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:id" element={<Detail />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
