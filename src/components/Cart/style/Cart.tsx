import { useDispatch, useSelector } from 'react-redux'
import { CartProps } from '../../../type/Cart/CartProps'
import { RootState } from '../../../redux/store'
import { decreaseQuantity, increaseQuantity, saveCart } from '../../../redux/actions/cart'

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart.cart)

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total: number, item: CartProps) => total + item.price * item.quantity,
    0
  )

  // Increase the quantity of an item
  const handleIncreaseQuantity = (item: CartProps) => {
    dispatch(increaseQuantity(item.id))
  }

  // Decrease the quantity of an item
  const handleDecreaseQuantity = (item: CartProps) => {
    dispatch(decreaseQuantity(item.id))
  }

  // Save the cart to local storage
  const handleSaveCart = () => {
    dispatch(saveCart(cart))
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          <ul>
            {cart.map((item: CartProps, index: number) => (
              <li key={`${item.id}-${index}`}>
                <div>{item.title}</div>
                <div>
                  Price: {item.price} €
                  <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                </div>
              </li>
            ))}
          </ul>
          <p>Total Price: {totalPrice} €</p>
          <button onClick={handleSaveCart}>Checkout</button>
        </div>
      )}
    </div>
  )
}

export default Cart
