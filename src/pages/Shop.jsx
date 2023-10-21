import Card from '../components/Card';
import Cart from '../components/Cart';
import { useContext, useEffect, useState } from 'react';
import { DataContext, CartContext } from '../App';

function Shop() {
  const [data, setData] = useContext(DataContext);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loaded, setLoaded] = useState(false);

  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    if (!data) {
      fetch('https://fakestoreapi.com/products')
        .then((res) => {
          if (res.status >= 400) {
            throw new Error('server error');
          }
          setLoaded(true);
          return res.json();
        })
        .then((json) => {
          const updatedJson = json.map((item) => ({
            ...item,
            quantity: 1,
          }));
          setData(updatedJson);
        })
        .catch((error) => setError(error))
        .finally(() => console.log('finally'));
    }
  });

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

  function handleQuantity(id, quantity, input) {
    let index = data.findIndex((product) => product.id === id);
    let newArr = [...data];

    updateQuantity(newArr, index, quantity, input);
    setData(newArr);
  }

  return (
    <>
      <h1>this is ShopPage!</h1>
      <div className="cart">
        <Cart
          cart={cart}
          deleteFromCart={deleteFromCart}
          handleAddToCart={handleAddToCart}
        />
      </div>
      <div className="products">
        {data &&
          data.map((product) => {
            return (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                img={product.image}
                desc={product.description}
                quantity={product.quantity}
                price={product.price}
                handleAddToCart={handleAddToCart}
                handleQuantity={handleQuantity}
              />
            );
          })}
      </div>
    </>
  );
}

export default Shop;
