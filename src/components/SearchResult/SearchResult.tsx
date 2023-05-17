import * as React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/actions/getProducts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import MultiActionAreaCard from '../HomPage/MultiActionAreaCard'
import Navbar from '../NavBar/NavBar'
import { CircularProgress, Link } from '@mui/material'
import { Footer } from '../Footer/Footer'
// import '../HomPage/style/HomePage.scss'
import './style/SearchResult.scss'
import SearchContext from '../../react/context/SerachContext'

import { Link as RouterLink } from 'react-router-dom'
import NavBar2 from '../NavBar/NavBar'

export default function SearchResult() {
  const dispatch = useDispatch<AppDispatch>()
  // const { products } = useSelector((state: RootState) => state.products)
  const { product } = React.useContext(SearchContext)

  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="product__container">
        {product?.map((product) => (
          <RouterLink key={product.id} to={`/product/${product.id}`}>
            <MultiActionAreaCard
              key={product.id}
              title={product.title}
              description={product.description}
              image={product.thumbnail}
              className="multicard"
              price={`${product.price} €`}
            />
          </RouterLink>
        ))}
      </div>
      {/* footer */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}
