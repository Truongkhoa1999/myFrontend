import { useDispatch, useSelector } from 'react-redux'
import { CartProps } from '../../type/Cart/CartProps'
import { AppDispatch, RootState } from '../../redux/store'
import { decreaseQuantity, increaseQuantity, saveCart } from '../../redux/actions/cart'
import NavBar2 from '../NavBar/NavBar'
import './style/Cart.scss'
import { fetchProducts } from '../../redux/actions/getProducts'
import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import Footer from '../Footer/Footer'
import jwtDecode from 'jwt-decode'
import { DecodedToken } from '../../type/DecodedToken/DecodedToken'

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cart } = useSelector((state: RootState) => state.cart)
  const { products } = useSelector((state: RootState) => state.products)
  const [notification, setNotification] = useState('')
  // Calculate the total price
  const totalPrice = cart.reduce(
    (total: number, item: CartProps) => total + item.price * item.quantity,
    0
  )
  const handleIncreaseQuantity = (item: CartProps) => {
    const product = products.find((p) => p.id === item.cartId)
    if (product && item.quantity <= product.quantity) {
      dispatch(increaseQuantity(item.cartId))
    } else {
      setNotification('Item is over stock.')
    }
  }
  const closeNotification = () => {
    setNotification('')
  }
  // Decrease the quantity of an item
  const handleDecreaseQuantity = (item: CartProps) => {
    if (item.quantity > 0) {
      dispatch(decreaseQuantity(item.cartId))
    }
  }
  const handleSaveCart = async () => {
    try {
      // Save cart to local storage
      dispatch(saveCart(cart))
      // Retrieve the JWT from local storage
      const token = localStorage.getItem('jwt') // Replace 'yourTokenKey' with the actual key for your JWT

      // Decode the JWT to access its payload
      // const decodedToken: { userId?: string } | null = token ? jwt_decode(token) : null
      const decodedToken = token ? (jwtDecode(token) as DecodedToken) : null

      // Extract the userId from the decoded token
      const userId = decodedToken?.userId ?? null

      const expirationTime = decodedToken?.exp || 0 // Get the expiration time from the decoded JWT
      const currentTime = Math.floor(Date.now() / 1000) // Convert current time to seconds
      if (currentTime > expirationTime) {
        // Token has expired, handle accordingly
        throw new Error('expired JWT')
      }

      // Create a new cart object with the user ID
      const cartWithUserId = cart.map((item: CartProps, index: number) => {
        if (index === 0 && !item.productId) {
          // Set the productId for the first item if it's missing
          return { ...item, userId, productId: item.cartId }
        }
        localStorage.removeItem('cart')
        return { ...item, userId }
      })
      console.log(cartWithUserId)
      // Send POST request to backend
      const response = await fetch('https://fs14-ecommerce.herokuapp.com/api/v1/carts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartWithUserId),
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to save cart.')
      }
      const savedCart = await response.json()
      // Display a success notification or perform any other desired action
      setNotification('Cart saved successfully.')
    } catch (error: unknown) {
      // Handle errors, display an error notification, or perform any other desired action
     
      if (error instanceof Error && error.message === 'expired JWT') {
        setNotification('Your login session has been expired, please sign-in again.')
      } else {
        setNotification('Error saving cart. Please try again.')
      }
    }
  }
  return (
    <div className="cart__container">
      {notification && (
        <div className="notification">
          <span>{notification}</span>
          <button className="close-button" onClick={closeNotification}>
            Close
          </button>
        </div>
      )}{' '}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="body_container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <div className="tableContent">
            <table className="cart">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* {cart.map((item: CartProps, index: number) => (
                  <tr key={`${item.cartId}-${index}`}>
                    <td>{item.title}</td>
                    <td>
                      <div className="quantity_group">
                        <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                      </div>
                    </td>
                    <td>{item.price} €</td>
                    <td>{item.price * item.quantity} €</td>
                  </tr>
                ))} */}
                {cart.map((item: CartProps, index: number) => {
                  const product = products.find((p) => p.id === item.productId)
                  return (
                    <tr key={`${item.cartId}-${index}`}>
                      <td>{item.title}</td>
                      <td>
                        <div className="quantity_group">
                          <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                        </div>
                      </td>
                      <td>{product?.quantity}</td>
                      <td>{item.price} €</td>
                      <td>{item.price * item.quantity} €</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>Total Price:</td>
                  <td>{totalPrice} €</td>
                </tr>
              </tfoot>
            </table>
            <button className="checkout__button" onClick={handleSaveCart}>
              Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
