// React Redux
import * as React from 'react'
import { RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/actions/getProducts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Link } from 'react-router-dom'

// Context

// Components & MUI
import MultiActionAreaCard from './MultiActionAreaCard'
import PostCarouse2 from './PostCarouse2'
import { Footer } from '../Footer/Footer'
import NavBar2 from '../NavBar/NavBar'
import { CircularProgress } from '@mui/material'

// Style
import './style/HomePage.scss'

// Data
import { ProduxProps } from '../../Data/Produx'
import { ProductProps } from '../../type/Product/ProductProps'
import {
  sortProductByCategory,
  sortProductsByPrice,
  sortProductsByRemove,
} from '../../utils/productUtil'
import FilterButtons from './FilterGroup'
import FilterGroup from './FilterGroup'

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  // Sort group
  const [sortedProducts, setSortedProducts] = React.useState<ProductProps[]>([])
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  // Category group

  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  React.useEffect(() => {
    if (products) {
      setSortedProducts(sortProductsByPrice(products, sortDirection))
    }
  }, [products, sortDirection])

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
        <FilterGroup products={products} className="main" />
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
