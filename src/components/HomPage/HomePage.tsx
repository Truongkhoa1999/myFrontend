import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/actions/products'
import { AppDispatch, RootState } from '../../redux/store'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

// Style
import './style/HomePage.scss'
import CustomAppBar from '../NavBar/CustomAppBar'
import PostCarouse2 from './PostCarouse2'

import { Footer } from '../Footer/Footer'
const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, error } = useSelector((state: RootState) => state.products)

  // Fetch Products
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <div>{error}</div>
  }
  // Best sellers data
  const bestSeller = products.filter((p) => p.quantity < 10)

  return (
    <div className="container">
      <div className="nav__container">
        <CustomAppBar />
      </div>
      {/* Frame1 */}
      <div className="postCarousel">
        <PostCarouse2 />
        <div className="demo_products">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="demo_cards">
              <h3>{product.category.title}</h3>
              <div className="products_image">
                <img src={product.images[0]}></img>
                <img src={product.images[1]}></img>
                <img src={product.images[2]}></img>
                <img src={product.images[3]}></img>
              </div>
              <p>view more</p>
            </div>
          ))}
        </div>
        {/* Frame2 */}
        <div className="bestseller_container">
          <h2>Best Sellers</h2>
          <div className="bestseller_cards">
            {bestSeller.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <div className="bestseller_items">
                  <img src={p.thumbnail} />
                  <h3>{p.title}</h3>
                  <h4>{p.price}</h4>
                  <p>{p.quantity}</p>
                  <button
                    disabled={p.quantity === 0}
                    className={p.quantity === 0 ? 'disabled' : ''}
                  >
                    ADD TO BASKET
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
