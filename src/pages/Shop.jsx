import Card from '../components/Card';
import { useContext, useEffect, useState } from 'react';
import { DataContext, CartContext } from '../App';

function Shop() {
  const [data, setData] = useContext(DataContext);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loaded, setLoaded] = useState(false);

  const { handleAddToCart } = useContext(CartContext);

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

  function handleQuantity(id, quantity, input) {
    let index = data.findIndex((product) => product.id === id);
    let newArr = [...data];

    updateQuantity(newArr, index, quantity, input);
    setData(newArr);
  }

  return (
    <>
      <h1>this is ShopPage!</h1>
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
