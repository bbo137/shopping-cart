import { useState, createContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';

export const DataContext = createContext();
export const CartContext = createContext();

function App() {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <DataContext.Provider value={[data, setData]}>
      <CartContext.Provider value={[cart, setCart]}>
        <Navigate to="/home" replace={true} />
        <NavBar />
        <div id="content">
          <Outlet />
        </div>
      </CartContext.Provider>
    </DataContext.Provider>
  );
}

export default App;