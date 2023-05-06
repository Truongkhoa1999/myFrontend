// React Redux
import * as React from 'react'
import { RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/actions/products'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { stateProps } from '../../redux/reducers/productReducer'
import { Link } from 'react-router-dom'

// Context
import AuthContext from '../../react/context/AuthContext'

// Components & MUI
import MultiActionAreaCard from './MultiActionAreaCard'
import PostCarouse2 from './PostCarouse2'
import { Footer } from '../Footer/Footer'
import { NavBar2 } from '../NavBar/NavBar2'

import { CircularProgress } from '@mui/material'

// Style
import './style/HomePage.scss'

// Data
import { Product } from '../../type/Products/products'
import { ProduxProps } from '../../Data/Produx'

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()

  // Pordux hard code
  const produx = useSelector((state: RootState) => state.produx)
  const { products } = useSelector((state: RootState) => state.products)
  // Sort group
  const [sortedProducts, setSortedProducts] = React.useState<Product[]>([])
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

  // Category group
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([])
  // Produx after added or removed or unremoved
  const [updatedProdux, setUpdatedProdux] = React.useState<ProduxProps[]>([])
  //
  // make this filteredProdux be updated whenever new staus comes
  React.useEffect(() => {
    setUpdatedProdux(produx.filter((p) => !p.status?.isRemoved || p.status.isArrival))
  }, [produx])

  // Fetch API for products here is also in which location for products
  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  const localProductsResponse = JSON.parse(localStorage.getItem('products') || '{}')
  const localProductsData: ProduxProps[] = localProductsResponse.data
  console.log(localProductsData, 'this is my local products')

  // the new version for  Produx
  React.useEffect(() => {
    if (produx) {
      // Clone the array to avoid mutating the original state
      const clonedProducts = [...updatedProdux]

      // Sort the products by price
      clonedProducts.sort((a, b) =>
        sortDirection === 'asc' ? a.price - b.price : b.price - a.price
      )

      // Update the state with the sorted products
      setSortedProducts(clonedProducts)
    }
  }, [produx, sortDirection])

  console.log('this is default sort product', sortedProducts)
  // for produx
  React.useEffect(() => {
    if (categoryFilter !== null) {
      const filteredProducts = updatedProdux.filter(
        (product) => product.category === categoryFilter
      )
      setFilteredProducts(filteredProducts)
    } else {
      setFilteredProducts(updatedProdux)
    }
  }, [updatedProdux, categoryFilter])

  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category)
  }
  const handleSortClick = () => {
    // Toggle the sort direction when the button is clicked
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="carousel__container">
        <PostCarouse2 />
      </div>
      <div className="main">
        {/* left group */}
        <div className="left">
          <div className="category__menu">
            <h1>Products</h1>
            <div className="buttongroup">
              <button onClick={() => handleCategoryFilter('laptops')}>laptops</button>
              <button onClick={() => handleCategoryFilter('smartphones')}>smartphones</button>
              <button onClick={() => handleCategoryFilter('fragrances')}>fragrances</button>
              <button onClick={() => handleCategoryFilter('skincare')}>skincare</button>
              <button onClick={() => handleCategoryFilter(null)}>All</button>
            </div>
          </div>
        </div>

        {/* right group */}
        <div className="right">
          <div className="category__group">
            <div className="list__card">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <MultiActionAreaCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.thumbnail}
                    className="multicard"
                    price={`${product.price} €`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* sort button */}
      <div className="sortgroup">
        <div className="sort__container">
          <button onClick={handleSortClick}>
            Sort by price {sortDirection === 'asc' ? '↓' : '↑'}
          </button>
        </div>
        <div className="product__container">
          {sortedProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <MultiActionAreaCard
                key={product.id}
                title={product.title}
                description={product.description}
                image={product.thumbnail}
                className="multicard"
                price={`${product.price} €`}
              />
            </Link>
          ))}
        </div>
      </div>
      {/* footer */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}
