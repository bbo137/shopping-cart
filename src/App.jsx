import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <Navigate to="/home" replace={true} />
      <NavBar />
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}

export default App;
