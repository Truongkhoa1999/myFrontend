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
import { Footer } from '../Footer/Footer'
import MultiActionAreaCard from '../HomPage/MultiActionAreaCard'
// import { saveCart } from '../../redux/actions/getProducts'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { getProductsById } from '../../redux/actions/getProductById'

import { CartProps } from '../../type/Cart/CartProps'
import { addItemToCart, increaseQuantity, saveCart } from '../../redux/actions/cart'
import NavBar2 from '../NavBar/NavBar'

const ProductDetail = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { productById, loading, error } = useSelector((state: RootState) => state.productById)
  const { id } = useParams<{ id: ReturnType<typeof uuidv4> }>()
  const [mainImage, setMainImage] = useState<string | null>(null)
  // Get the current cart from the state
  const { cart } = useSelector((state: RootState) => state.cart)

  // hover effect
  const handleImageHover = (image: string) => {
    setMainImage(image)
  }
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
  // ADD TO CART

  const handleAddToCart = () => {
    const newItem: CartProps = {
      cartId: productById?.id ?? '',
      title: productById?.title ?? '',
      price: productById?.price ?? 0,
      quantity: 1,
      productId: productById?.id ?? '',
    }

    const existingItem = cart.find((item: CartProps) => item.cartId === newItem.cartId)

    if (existingItem) {
      dispatch(increaseQuantity(existingItem.id))
    } else {
      newItem.productId = productById?.id ?? ''
      dispatch(addItemToCart(newItem))
    }

    // Update the cart state after dispatching the actions
    // const updatedCart = [...cart, newItem]
    // dispatch(saveCart(updatedCart))

    console.log(cart)
  }

  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="body">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div>error</div>
        ) : (
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
        )}
        <div className="product-detail-container">
          <div className="content-container">
            <h1>{productById?.title}</h1>
            <p>{`category: ${productById?.category} - Brand: ${productById?.brand}`}</p>
            <h2>{`${productById?.price} € `}</h2>
            <p>{productById?.description}</p>
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>

      {/* Relevant products */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default ProductDetail
