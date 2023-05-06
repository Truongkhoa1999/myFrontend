import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../type/Products/products'
import { Footer } from '../Footer/Footer'
import Navbar from '../NavBar/NavBar'
import './style/Cart.scss'
import {
  LOCAL_PRODUCT,
  LOCAL_PRODUCT_KEY,
  decreaseQuantity,
  increaseQuantity,
  saveCart,
} from '../../redux/actions/products'
import { useNavigate } from 'react-router-dom'
import { NavBar2 } from '../NavBar/NavBar2'
import { useEffect, useState } from 'react'

const Cart = () => {
  const { cart } = useSelector((state: RootState) => ({
    cart: state.products.cart,
  }))

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const produk = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_KEY) || '{}')
  const officialArray = produk.data || []

  // check if there is a saved cart in localStorage and use it if exists
  const [savedCart, setSavedCart] = useState([])
  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]')
    setSavedCart(cartFromStorage)
  }, [])
  // Total price computation
  const getTotalPrice = () => {
    let total = 0
    cart.forEach((item) => {
      const product = officialArray.find((p: Product) => p.id === item.id)
      if (product) {
        total += product.price * item.quantity
      }
    })
    return total
  }

  const handleCheckout = () => {
    dispatch(saveCart(cart))
    navigate('/checkout')
  }

  return (
    <div className="cart__container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="tableContent">
        <table className="cart">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {(cart || savedCart)?.map((item) => {
              const product = officialArray.find((p: Product) => p.id === item.id)

              if (!product) {
                return null
              }
              return (
                <tr key={product.id}>
                  <td>
                    <img className="image" src={product.thumbnail} alt="" />
                    <p>{product.title}</p>
                  </td>
                  <td>
                    <div className="quantity_group">
                      <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                      {item.quantity}
                      <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                    </div>
                  </td>
                  <td>${product.price}</td>
                  <td>${product.price * item.quantity}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total Price:</td>
              <td>${getTotalPrice()}</td>
            </tr>
          </tfoot>
        </table>
        <button className="checkout__button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default Cart
