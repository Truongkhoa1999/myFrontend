import { CartProps } from '../type/Cart/CartProps'
import { ProductProps } from '../type/Product/ProductProps'

export const pushItemToCart = (cart: CartProps[], id: string): CartProps[] => {
  const newCart: CartProps[] = [...cart]
  const itemIdx = newCart.findIndex((item) => String(item.id) === String(id))
  if (itemIdx !== -1) {
    newCart[itemIdx] = {
      ...newCart[itemIdx],
      quantity: newCart[itemIdx].quantity + 1,
    }
  } else {
    newCart.push({
      id,
      title: '', // Set the appropriate title value here
      price: 0, // Set the appropriate price value here
      quantity: 1,
    })
  }
  return newCart
}

// Compute total cart
export const getTotalPrice = (cart: CartProps[], products: any) => {
  let total = 0
  cart.forEach((item) => {
    const product = products.data.find((p: ProductProps) => p.id === item.id)
    if (product) {
      total += product.price * item.quantity
    }
  })
  return total
}
// Create orders items: holding all items that are put into cart
export const createOrderItem = (item: CartProps, products: any) => {
  const product = products.data.find((p: ProductProps) => p.id === item.id)
  return {
    id: product?.id,
    name: product?.title,
    quantity: item.quantity,
    price: product?.price,
  }
}