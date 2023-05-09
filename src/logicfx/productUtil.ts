import { ProductResponse } from '../redux/actions/getProducts'
import { CartProps } from '../redux/reducers/productsReducer'
import { Product } from '../type/Products/ProductProps'

export const pushItemToCart = (cart: CartProps[], id: number): CartProps[] => {
  // check if item exist in cart
  const newCart: CartProps[] = [...cart]
  const itemIdx = newCart.findIndex((item) => item.id === id)
  if (itemIdx !== -1) {
    // found
    newCart[itemIdx] = {
      id,
      quantity: newCart[itemIdx].quantity + 1,
    }
  } else {
    // not found
    newCart.push({
      id,
      quantity: 1,
    })
  }
  return newCart
}
// Compute total cart
export const getTotalPrice = (cart: CartProps[], products: any) => {
  let total = 0
  cart.forEach((item) => {
    const product = products.data.find((p: Product) => p.id === item.id)
    if (product) {
      total += product.price * item.quantity
    }
  })
  return total
}
// Create orders items: holding all items that are put into cart
export const createOrderItem = (item: CartProps, products: any) => {
  const product = products.data.find((p: Product) => p.id === item.id)
  return {
    id: product?.id,
    name: product?.title,
    quantity: item.quantity,
    price: product?.price,
  }
}
