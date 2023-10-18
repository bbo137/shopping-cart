import Card from '../components/Card';
import Cart from '../components/Cart';
import { useEffect, useState } from 'react';

let initialData = null;

function Shop() {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [cart, setCart] = useState([]);

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
          setData(json);
          initialData = json;
        })
        .catch((error) => setError(error))
        .finally(() => console.log('finally'));
    }
  }, []);

  function handleAddToCart(id, quantity) {
    let productIndex = -1;
    const cartProduct = cart.find((product, index) => {
      if (product.id === id) {
        productIndex = index;
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
      newArr[productIndex].quantity += quantity;
      setCart(newArr);
    }
  }

  function deleteFromCart(id) {
    //add confirm?
    const newArr = cart.filter((product) => product.id != id);
    setCart(newArr);
  }

  return (
    <>
      <h1>this is ShopPage!</h1>
      <div className='cart'>
        <Cart cart={cart} deleteFromCart={deleteFromCart} />
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
                price={product.price}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
      </div>
    </>
  );
}

export default Shop;
