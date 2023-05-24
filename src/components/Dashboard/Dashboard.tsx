import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import NavBar2 from '../NavBar/NavBar'
import { CartProps } from '../../type/Cart/CartProps'
import './style/Dashboard.scss'
import { getCartByUserId } from '../../redux/actions/getCartByUserId'
import NotSignin from '../NotFound/NotSignin'
import ExpiredSignin from '../NotFound/ExpiredSignin'
import Footer from '../Footer/Footer'

export default function Dashboard() {
  const { cartByUserId, error } = useSelector((state: RootState) => state.cartByUserId)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getCartByUserId())
  }, [])
  return (
    <div className="dashboard_container">
      <NavBar2 />
      <div className="carts">
        {cartByUserId ? (
          cartByUserId.map((cart: CartProps, index: number) => (
            <div className="cart" key={index}>
              <div className="cart_item">
                <h3>{cart.title}</h3>
                <p>Quantity: {cart.quantity}</p>
                <p>Price: {cart.price}</p>
              </div>
            </div>
          ))
        ) : error === "JWT has expired" ? (
          <ExpiredSignin />
        ) : (
          <NotSignin />
        )}
      </div>
      <Footer />
    </div>
  )
}
