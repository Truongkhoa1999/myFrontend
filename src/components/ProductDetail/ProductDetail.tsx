// React and Redux
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
// import { stateProps } from '../../redux/reducers/productsReducer'
import { addItemToCart } from '../../redux/actions/getProducts'

// Data and type
import { ProductProps } from '../../type/Products/ProductProps'
import { Produx, ProduxProps } from '../../Data/Produx'

// Style
import './style/ProductDetail.scss'
import { v4 as uuidv4 } from 'uuid'
// Components
import { Footer } from '../Footer/Footer'
import { NavBar2 } from '../NavBar/NavBar2'
import MultiActionAreaCard from '../HomPage/MultiActionAreaCard'
import { saveCart } from '../../redux/actions/getProducts'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { getProductsById } from '../../redux/actions/getProductById'

const ProductDetail = () => {
  // const { products } = useSelector((state: RootState): stateProps => state.products)
  const dispatch = useDispatch<AppDispatch>()
  const { productById, loading, error } = useSelector((state: RootState) => state.productById)
  const { id } = useParams<{ id: ReturnType<typeof uuidv4> }>()
  // Fetch products
  useEffect(() => {
    if (id) {
      dispatch(getProductsById(id))
    }
  }, [dispatch, id])
  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <div>{error}</div>
  }
  console.log(productById)
  const [mainImage, setMainImage] = useState<string | null>(null)
  // hover effect
  const handleImageHover = (image: string) => {
    setMainImage(image)
  }
  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>

      {/* <div className="product-detail-container">
        <div className="img__container">
          <img className="main" src={mainImage ?? product.images[0]}></img>
          <div className="detailImage">
            <img
              className="second"
              onClick={() => handleImageHover(product!.images[1])}
              src={product.images[1]}
            ></img>
            <img
              className="third"
              onClick={() => handleImageHover(productById!.images[2])}
              src={product.images[2]}
            ></img>
            <img
              className="fourth"
              onClick={() => handleImageHover(product!.images[3])}
              src={product.images[3]}
            ></img>
          </div>
        </div>
        <div className="content-container">
          <h1>{product.title}</h1>
          <p>{`category: ${product.category} - Brand: ${product.brand}`}</p>
          <h2>{`${product.price} € `}</h2>
          <p>{product.description}</p>
          <button>Add to cart</button>
        </div>
      </div> */}
      {/* Relevant products */}
      <div className="relevant__products">
        <h1>Relevant items</h1>
        {/* <div className="listcard">
          {relevantProducts.map((product) => (
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
        </div> */}
      </div>
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default ProductDetail
