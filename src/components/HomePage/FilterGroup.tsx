import React, { useRef, useState } from 'react'
import { ProductProps } from '../../type/Product/ProductProps'
import {
  handleClick,
  limitTitleWords,
  sortProductByCategory,
  sortProductsByRemove,
} from '../../utils/productUtil'
import { Link } from 'react-router-dom'
import MultiActionAreaCard from './MultiActionAreaCard'
import './style/FilterGroup.scss'
export default function FilterGroup({ products }: { products: ProductProps[] }) {
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = React.useState<ProductProps[]>([])
  const [updatedProducts, setUpdatedProducts] = React.useState<ProductProps[]>([])
  // 2d interaction
  const cardContainerRef = useRef<HTMLDivElement>(null) // Reference to the card container

  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category)
  }

  React.useEffect(() => {
    if (categoryFilter !== null) {
      setFilteredProducts(sortProductByCategory(updatedProducts, categoryFilter))
    } else {
      setFilteredProducts(updatedProducts)
    }
  }, [updatedProducts, categoryFilter])
  // Produx after added or removed or unremoved
  // useEffect group
  React.useEffect(() => {
    setUpdatedProducts(sortProductsByRemove(products))
  }, [products])

  const handleScrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      })
    }
  }

  const handleScrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="filter_container">
      <div className="buttongroup">
        <button onClick={() => handleCategoryFilter('Component')}>Component</button>
        <button onClick={() => handleCategoryFilter('Smartphone')}>Smartphone</button>
        <button onClick={() => handleCategoryFilter('Peripherals')}>Peripherals</button>
        <button onClick={() => handleCategoryFilter('Furniture')}>Furniture</button>
        <button onClick={() => handleCategoryFilter(null)}>All</button>
      </div>
      <div className="arrow-group">
        <div className="arrow arrow-left" onClick={handleScrollLeft}>
          &lt;
        </div>
        <div className="arrow arrow-right" onClick={handleScrollRight}>
          &gt;
        </div>
      </div>
      <div className="card_container" ref={cardContainerRef}>
        <div className="card_wrapper">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              {product.quantity !== 0 ? (
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => handleClick(product.statics.statId)}
                >
                  <img src={product.thumbnail} />
                  <h3>{limitTitleWords(product.title, 4)}</h3>
                  <div className="information">
                    <h2>{product.price} €</h2>
                  </div>
                </Link>
              ) : (
                <>
                  <img src={product.thumbnail} />
                  <h3>{limitTitleWords(product.title, 4)}</h3>
                  <div className="information">
                    <h2>{product.price} €</h2>
                  </div>
                </>
              )}
              <button
                disabled={product.quantity === 0}
                className={product.quantity === 0 ? 'disabled' : ''}
                onClick={() => handleClick(product.statics.statId)}
              >
                ADD TO BASKET
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
