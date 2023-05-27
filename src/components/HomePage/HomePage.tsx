// React Redux
import * as React from 'react'
import { RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/actions/getProducts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Link, useNavigate } from 'react-router-dom'

// Context

// Components & MUI
import MultiActionAreaCard from './MultiActionAreaCard'
import NavBar2 from '../NavBar/NavBar'
import { CircularProgress } from '@mui/material'

// Style
import './style/HomePage.scss'

// Data
import { ProductProps } from '../../type/Product/ProductProps'
import {
  handleClick,
  sortProductByCategory,
  sortProductsByPrice,
  sortProductsByRemove,
} from '../../utils/productUtil'
import FilterButtons from './FilterGroup'
import FilterGroup from './FilterGroup'
import PostCarousel from './PostCarousel'
import Banner from './Banner'
import NobleChair from './NobleChair'
import Brand from './Brand'
import DuckyProducts from './DuckyProducts'
import Footer from '../Footer/Footer'

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  const navigate = useNavigate()

  // Sort group
  const [sortedProducts, setSortedProducts] = React.useState<ProductProps[]>([])
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [duckyProducts, setDuckyProducts] = React.useState<ProductProps[]>([])
  // Category group

  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  React.useEffect(() => {
    const filteredProducts = products.filter((p) => p.brand === 'Ducky')
    setDuckyProducts(filteredProducts)
    console.log(duckyProducts)
  }, [products])

  React.useEffect(() => {
    if (products) {
      setSortedProducts(sortProductsByPrice(products, sortDirection))
    }
  }, [products, sortDirection])

  const handleSortClick = () => {
    // Toggle the sort direction when the button is clicked
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }
  console.log(duckyProducts)
  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="postCarousel">
        {/* Frame1 */}
        {/* <PostCarousel /> */}
        <Banner />
        <div className="demo_products">
          {products.slice(0, 1).map((product) => (
            <div key={product.id} className="demo_cards">
              <div className="products_image">
                <img src={product.images[1]}></img>
              </div>
              <div className="information">
                <h3>New Arrival</h3>
                <p>view more</p>
              </div>
            </div>
          ))}
          {products.slice(1, 2).map((product) => (
            <div key={product.id} className="demo_cards">
              <div className="products_image">
                <img src={product.images[1]}></img>
              </div>
              <div className="information">
                <h3>Most visit</h3>
                <p onClick={() => navigate('/mostvisit')}>view more</p>
              </div>
            </div>
          ))}
          {products.slice(2, 3).map((product) => (
            <div key={product.id} className="demo_cards">
              <div className="products_image">
                <img src={product.images[1]}></img>
              </div>
              <div className="information">
                <h3>We Recommend</h3>
                <p>view more</p>
              </div>
            </div>
          ))}
        </div>
        {/* Frame2 */}
        <div className="filter_group">
          <FilterGroup products={products} />
        </div>
        {/* Frame3 */}
        <DuckyProducts duckyProducts={duckyProducts} handleClick={handleClick} />
        {/* Frame5 */}
        <NobleChair products={products} />
        {/* Frame6 */}
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
        {/* Frame7 */}
        <Brand />
        <div className="footer__container">
          <Footer />
        </div>
      </div>
    </div>
  )
}
