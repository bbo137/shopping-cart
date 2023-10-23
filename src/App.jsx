import { useState, createContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import './App.css';

export const DataContext = createContext();
export const CartContext = createContext();

function App() {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function updateQuantity(arr, index, quantity, input) {
    if (isNaN(quantity) || (input && quantity === '')) {
      arr[index].quantity = '';
    } else if (input) {
      arr[index].quantity =
        quantity === 0 && arr[index].quantity === '' ? '' : String(quantity);
    } else {
      arr[index].quantity = Math.max(1, Number(arr[index].quantity) + quantity);
    }
  }

  function handleAddToCart(id, quantity, input) {
    let index = -1;
    const cartProduct = cart.find((product, i) => {
      if (product.id === id) {
        index = i;
        return true;
      }
      return false;
    });

    if (!cartProduct) {
      // doesn't have the item
      let product = data.find((product) => product.id === id);
      product = { ...product, quantity: quantity };
      setCart([...cart, product]);
    } else {
      // already has the item
      let newArr = [...cart];

      updateQuantity(newArr, index, quantity, input);
      setCart(newArr);
    }
  }

  function deleteFromCart(id) {
    //add confirm?
    const newArr = cart.filter((product) => product.id !== id);
    setCart(newArr);
  }

  return (
    <DataContext.Provider value={[data, setData]}>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          isCartOpen,
          setIsCartOpen,
          handleAddToCart,
          deleteFromCart,
        }}
      >
        <Navigate to="/home" replace={true} />
        <NavBar />
        {isCartOpen && (
          <div className="cart">
            <Cart
              cart={cart}
              deleteFromCart={deleteFromCart}
              handleAddToCart={handleAddToCart}
            />
          </div>
        )}
        <div id="content">
          <Outlet />
        </div>
      </CartContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
