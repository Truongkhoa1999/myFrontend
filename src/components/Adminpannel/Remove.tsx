import { useDispatch } from 'react-redux';
import { ProductProps } from '../../type/Product/ProductProps';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import './style/Remove.scss';
import { AppDispatch } from '../../redux/store';
import { deleteProductsById } from '../../redux/actions/deleteProductById';
import { restoreProductsById } from '../../redux/actions/restoreProductById';
import { filterProductsBySearch } from '../../utils/productUtil';
import { deleteAllProducts } from '../../redux/actions/deleteAllProducts';
import { restoreAllProducts } from '../../redux/actions/restoreAllProducts';

export default function Remove({ products }: { products: ProductProps[] }) {
  console.log(products);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRemoveId, setActiveRemoveId] = useState<string>('');
  const [activeRestoreId, setActiveRestoreId] = useState<string>('');

  const filteredProducts = filterProductsBySearch(products, searchQuery);

  const handleRemoved = (id: ReturnType<typeof uuidv4>) => {
    setActiveRemoveId(id);
    setActiveRestoreId('');
    dispatch(deleteProductsById(id));
  };

  const handleUnRemoved = (id: ReturnType<typeof uuidv4>) => {
    setActiveRemoveId('');
    setActiveRestoreId(id);
    dispatch(restoreProductsById(id));
  };
  const handleRemoveAll = () =>{
    dispatch(deleteAllProducts())
  }
  const handleRestoreAll = () =>{
    dispatch(restoreAllProducts())
  }


  return (
    <div className="remove_container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='all'>
        <button onClick={() => handleRemoveAll()}>Remove All</button>
        <button onClick={() => handleRestoreAll()}>Restore All</button>
      </div>
      {filteredProducts.map((p) => (
        <div className="product">
          <img className="item_img" src={p.thumbnail} />
          <div className='info'>
          <h3>{p.title}</h3>
          <p style={{color:"red"}}>{p.removed ? 'Status: Removed' : 'Status: Available'}</p>
          </div>
      
          <div>
            <button
              className={`remove_button ${activeRemoveId === p.id ? 'active' : ''}`}
              onClick={() => handleRemoved(p.id)}
              title='Removed'
            >
              x
            </button>
            <button
              className={`remove_button ${activeRestoreId === p.id ? 'active' : ''}`}
              onClick={() => handleUnRemoved(p.id)}
              title='Restore'
            >
              ↶
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
