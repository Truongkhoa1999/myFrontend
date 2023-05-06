import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Navbar from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import { Product } from '../../type/Products/products'
import './style/checkout.scss'
import { NavBar2 } from '../NavBar/NavBar2'
import { createOrderItem, getTotalPrice } from '../../logicfx/productUtil'

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.products.cart)
  const products = useSelector((state: RootState) => state.products.products)

  // const getTotalPrice = () => {
  //   let total = 0
  //   cart.forEach((item) => {
  //     const product = products.data.find((p: Product) => p.id === item.id)
  //     if (product) {
  //       total += product.price * item.quantity
  //     }
  //   })
  //   return total
  // }
  const totalPrice = getTotalPrice(cart, products)

  // generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000)

  // get today's date
  const today = new Date().toLocaleDateString()

  const orderItems = cart.map((item) => createOrderItem(item, products))
  // create an object to hold the details of the order
  const order = {
    orderNumber,
    date: today,
    // items: cart.map((item) => {
    //   const product = products.data.find((p: Product) => p.id === item.id)
    //   return {
    //     id: product?.id,
    //     name: product?.title,
    //     quantity: item.quantity,
    //     price: product?.price,
    //   }
    // }),
    items: orderItems,
  }

  return (
    <div className="checkout_container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <div className="tableContent">
        <h1>Checkout</h1>
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{order.orderNumber}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price! * item.quantity}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total Price:</td>
              <td colSpan={2}>${totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default Checkout
