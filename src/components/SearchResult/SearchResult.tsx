import * as React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/actions/getProducts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
// import '../HomPage/style/HomePage.scss'
import './style/SearchResult.scss'
import SearchContext from '../../react/context/SerachContext'

import { Link as RouterLink } from 'react-router-dom'
import NavBar2 from '../NavBar/NavBar'
import NotFound from '../NotFound/NotFound'
import Footer from '../Footer/Footer'

export default function SearchResult() {
  const dispatch = useDispatch<AppDispatch>()
  // const { products } = useSelector((state: RootState) => state.products)
  const { product } = React.useContext(SearchContext)
  console.log('this aux product', product)
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
        {product?.length === 0 ? (
          <NotFound />
        ) : (
          product?.map((product) => (
            <RouterLink key={product.id} to={`/product/${product.id}`}>
              <div className="product">
                <h2>{product.title}</h2>
                <h2>{product.price}€</h2>
                <img src={product.thumbnail} alt="products" />
              </div>
            </RouterLink>
          ))
        )}
              <div className="footer__container">
        <Footer />
      </div>
      </div>


    </div>
  )
}
