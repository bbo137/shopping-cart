// React dependencies
import { useContext, useEffect, useState } from 'react';

// Components
import Card from '../components/card/Card';
import OptionSelector from '../components/inputs/OptionSelector';

// Contexts
import { DataContext, CartContext } from '../App';

// Styles
import styles from './styles/Shop.module.css';

const options = [
  'None',
  'Name',
  'Price: Low to High',
  'Price: High to Low',
  'Rating: High to Low',
  'Rating: Low to High',
];

function Shop() {
  const [data, setData] = useContext(DataContext);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loaded, setLoaded] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('None');

  const [selectedSortOption, setSelectedSortOption] = useState(options[0]);

  const [dataFiltered, setDataFiltered] = useState(data);

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
          setDataFiltered(updatedJson);
        })
        .catch((error) => setError(error))
        .finally(() => {
          console.log('finally');
        });
    }
  });

  useEffect(() => {
    if (!data) return;
    let filteredData = [...data];
    if (selectedCategory !== 'Any') {
      filteredData = filteredData.filter(
        (product) => product.category === selectedCategory.toLowerCase()
      );
    }
    switch (selectedSortOption) {
      case options[0]:
        filteredData = [...filteredData].sort((a, b) => a.id - b.id);
        break;
      case options[1]:
        filteredData = [...filteredData].sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        break;
      case options[2]:
        filteredData = [...filteredData].sort((a, b) => a.price - b.price);
        break;
      case options[3]:
        filteredData = [...filteredData].sort((a, b) => b.price - a.price);
        break;
      case options[4]:
        filteredData = [...filteredData].sort(
          (a, b) => b.rating.rate - a.rating.rate
        );
        break;
      case options[5]:
        filteredData = [...filteredData].sort(
          (a, b) => a.rating.rate - b.rating.rate
        );
        break;
      default:
        break;
    }

    setDataFiltered(filteredData);
  }, [data, selectedCategory, selectedSortOption]);

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

  function getCategories() {
    let categories = new Set();
    data.map((product) => {
      categories.add(
        product.category.charAt(0).toUpperCase() + product.category.slice(1)
      );
    });
    categories = [...categories];
    categories.sort();
    categories.unshift('Any');

    return categories;
  }

  return (
    <>
      <div className={styles.filters}>
        {data && (
          <OptionSelector
            default="Any"
            name="Category: "
            options={getCategories()}
            filter={setSelectedCategory}
          />
        )}
        {data && (
          <OptionSelector
            default={options[0]}
            name="Sort by: "
            options={options}
            filter={setSelectedSortOption}
          />
        )}
      </div>
      {dataFiltered && (
        <div className={styles.container}>
          {dataFiltered &&
            dataFiltered.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                img={product.image}
                desc={product.description}
                rating={product.rating}
                quantity={product.quantity}
                price={product.price}
                handleAddToCart={handleAddToCart}
                handleQuantity={handleQuantity}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Shop;
