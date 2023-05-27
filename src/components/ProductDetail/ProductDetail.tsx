// React and Redux
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
// import { stateProps } from '../../redux/reducers/productsReducer'
// import { addItemToCart } from '../../redux/actions/getProducts'
// Data and type
// Style
import './style/ProductDetail.scss'
import { v4 as uuidv4 } from 'uuid'
// Components
// import MultiActionAreaCard from '../HomPage/MultiActionAreaCard'
// import { saveCart } from '../../redux/actions/getProducts'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { getProductsById } from '../../redux/actions/getProductById'

import { CartProps } from '../../type/Cart/CartProps'
import { addItemToCart, increaseQuantity, saveCart } from '../../redux/actions/cart'
import NavBar2 from '../NavBar/NavBar'
import { fetchProducts } from '../../redux/actions/getProducts'
import { ProductProps } from '../../type/Product/ProductProps'
import StarRating from '../StarRating/StarRating'
import { handleClick } from '../../utils/productUtil'
import Footer from '../Footer/Footer'

const ProductDetail = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { productById, loading, error } = useSelector((state: RootState) => state.productById)
  const { id } = useParams<{ id: ReturnType<typeof uuidv4> }>()
  const [mainImage, setMainImage] = useState<string | null>(null)
  // Get the current cart from the state
  const { cart } = useSelector((state: RootState) => state.cart)
  const { products } = useSelector((state: RootState) => state.products)

  const [relevantProducts, setRelevantProducts] = useState<ProductProps[]>([])
  // hover effect
  const handleImageHover = (image: string) => {
    setMainImage(image)
  }

  // Fetch products
  useEffect(() => {
    if (id) {
      dispatch(getProductsById(id))
      dispatch(fetchProducts())
    }
    const clonedProduct = [...products]
    setRelevantProducts(
      clonedProduct.filter((p) => p.category.title === productById?.category.title)
    )
  }, [dispatch, id])
  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <div>{error}</div>
  }
  // ADD TO CART

  const handleAddToCart = () => {
    const newItem: CartProps = {
      cartId: productById?.id ?? '',
      title: productById?.title ?? '',
      price: productById?.price ?? 0,
      quantity: 1,
      productId: productById?.id ?? '',
      map: undefined,
    }

    const existingItem = cart.find((item: CartProps) => item.cartId === newItem.cartId)

    if (existingItem) {
      dispatch(increaseQuantity(existingItem.id))
    } else {
      newItem.productId = productById?.id ?? ''
      dispatch(addItemToCart(newItem))
    }
    console.log(cart)
  }

  console.log(relevantProducts, 'this is relevant products')

  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="body_container">
        <div className="post_container">
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>error</div>
          ) : (
            <div className="wrapper">
              <div className="left">
                <div className="img_container">
                  <img className="mainImage" src={mainImage ?? productById?.images[0]}></img>
                  <div className="detailImage">
                    <img
                      className="second"
                      onClick={() => handleImageHover(productById!.images[1])}
                      src={productById?.images[1]}
                    ></img>
                    <img
                      className="third"
                      onClick={() => handleImageHover(productById!.images[2])}
                      src={productById?.images[2]}
                    ></img>
                    <img
                      className="fourth"
                      onClick={() => handleImageHover(productById!.images[3])}
                      src={productById?.images[3]}
                    ></img>
                  </div>
                </div>
                <div className="side_info">
                  <h2>{productById?.category.title}</h2>
                  <h3>{productById?.brand}</h3>
                  <p>{productById?.description}</p>
                  <p>
                    Feature: 
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloremque eaque
                      reiciendis recusandae maxime, beatae consequuntur porro dicta saepe unde, ex
                      adipisci, aperiam sapiente cupiditate. Commodi magni perferendis ipsa atque!
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloremque eaque
                      reiciendis recusandae maxime, beatae consequuntur porro dicta saepe unde, ex
                      adipisci, aperiam sapiente cupiditate. Commodi magni perferendis ipsa atque!
                  </p>
                </div>
              </div>
              <div className="product-detail-container">
                <div className="content-container">
                  <h1>{productById?.title}</h1>
                  <h2>{`${productById?.price} € `}</h2>
                  <p className="tax">Including 24% VAT</p>
                  <p>Only {productById?.quantity} species left</p>
                  <h3>Estimated delivery time: 1-4 working days</h3>
                  <button onClick={handleAddToCart}>Add to cart</button>
                  <StarRating rating={productById?.statics.rating} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relevant_products">
          {relevantProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="card" onClick={() => handleClick(product.statics.statId)}>
                <img src={product.thumbnail} />
                {/* <h3>{limitTitleWords(product.title, 4)}</h3> */}
                <div className="information">
                  <h2>{product.price} €</h2>
                  {/* <p>{product.quantity}</p> */}
                </div>
                <button
                  disabled={product.quantity <= 0}
                  className={product.quantity <= 0 ? 'disabled' : ''}
                  onClick={() => handleClick(product.statics.statId)}
                >
                  ADD TO BASKET
                </button>
              </div>
            </Link>
          ))}
        </div>
        <div className="footer__container">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
