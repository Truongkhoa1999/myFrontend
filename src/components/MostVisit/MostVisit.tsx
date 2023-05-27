import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/actions/getProducts'
import NavBar2 from '../NavBar/NavBar'
import { ProductProps } from '../../type/Product/ProductProps'
import './style/MostVisit.scss'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
export default function MostVisit() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  const [mostViewProducts, setMostViewProducts] = useState<ProductProps[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter( p => !p.removed)
      const clonedProducts = [...filteredProducts]
      const sortedProducts = clonedProducts.sort((a, b) => b.statics.clicks - a.statics.clicks)
      setMostViewProducts(sortedProducts)
      console.log(sortedProducts)
    }
  }, [products])

  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="list_products">
        <h2>Most view items</h2>
        { mostViewProducts.map((product) => (
          <div
            key={product.id}
            className="product"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div>
              <h3>{product.title}</h3>
              <p>Clicks: {product.statics.clicks}</p>
            </div>

            <img src={product.thumbnail} />
          </div>
        ))}
              <div className="footer__container">
        <Footer />
      </div>
      </div>

    </div>
  )
}
