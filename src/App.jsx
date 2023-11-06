// React dependencies
import { useState, createContext, useEffect } from 'react';

// Router
import { Navigate, Outlet } from 'react-router-dom';

// Components
import NavBar from './components/navbar/NavBar';
import Cart from './components/cart/Cart';

// Styles
import './App.css';

export const DataContext = createContext();
export const CartContext = createContext();

function App() {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [slideOutReady, setSlideOutReady] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    setCart(JSON.parse(savedCart));
    if (savedCart === null) {
      setCart([]);
    }
  }, []);

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
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
    } else {
      // already has the item
      let newArr = [...cart];

      updateQuantity(newArr, index, quantity, input);
      setCart(newArr);
      localStorage.setItem('cart', JSON.stringify(newArr));
    }
  }

  function deleteFromCart(id) {
    //add confirm?
    const newArr = cart.filter((product) => product.id !== id);
    setCart(newArr);
    localStorage.setItem('cart', JSON.stringify(newArr));
  }

  function toggleCart() {
    console.log('hi');
    if (!isCartOpen) {
      setIsCartOpen(!isCartOpen);
      setSlideOutReady(!slideOutReady);
    } else {
      setSlideOutReady(!slideOutReady);
      setTimeout(() => {
        setIsCartOpen(!isCartOpen);
      }, 500);
    }
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
          toggleCart,
        }}
      >
        <Navigate to="/home" replace={true} />
        <NavBar />
        <div className="modal">
          <div
            className={`shadow ${slideOutReady ? 'open' : 'close'}`}
            onClick={() => toggleCart()}
          ></div>
          <div className={`cart ${slideOutReady ? 'open' : 'close'}`}>
            {isCartOpen && (
              <Cart
                slideOutReady={slideOutReady}
                cart={cart}
                deleteFromCart={deleteFromCart}
                handleAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>
        <div id="content">
          <Outlet />
        </div>
      </CartContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
