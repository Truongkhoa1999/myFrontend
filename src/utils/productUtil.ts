import React from 'react'
import { CartProps } from '../type/Cart/CartProps'
import { ProductProps } from '../type/Product/ProductProps'
import { deleteProductsById } from '../redux/actions/deleteProductById'
import { restoreProductsById } from '../redux/actions/restoreProductById'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import jwtDecode from 'jwt-decode'
import { DecodedToken } from '../type/DecodedToken/DecodedToken'


export const sortProductsByPrice = (
  products: ProductProps[],
  sortDirection: 'asc' | 'desc'
): ProductProps[] => {
  const clonedProducts = [...products]
  clonedProducts.sort((a, b) => (sortDirection === 'asc' ? a.price - b.price : b.price - a.price))
  return clonedProducts
}
// Finding existing products
export const sortProductsByRemove = (products: ProductProps[]): ProductProps[] => {
  const existingProducts = products.filter((item) => item.removed === false)
  return existingProducts
}
// Finding products by category
export const sortProductByCategory = (
  updatedProducts: ProductProps[],
  categoryFilter: string
): ProductProps[] => {
  const filteredProducts = updatedProducts.filter((item) => item.category.title === categoryFilter)
  return filteredProducts
}
// limit words title
export function limitTitleWords(title:string, maxWords:number) :string {
  const words = title.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return title;
}
export function handleClick  (id:string)  {
  // Make the API call to update the clicks property
  fetch(`https://fs14-ecommerce.herokuapp.com/api/v1/statics/clicks/${id}`, { method: 'PUT' })
    .then(response => {
      if (response.ok) {
        console.log('Clicks updated successfully');
      }
    })
    .catch(error => {
      // Handle the error
      console.error('Error updating clicks:', error);
    });
};

// Adminpannel
export function filterProductsBySearch (products: ProductProps[], searchQuery: string):ProductProps[]  {
  return products.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
} 

// Finding user carts information
export const fetchCartByUserId = async () => {
  try {
    // Get token and check
    const token = localStorage.getItem('jwt');
    const decodedToken = token ? (jwtDecode(token) as DecodedToken) : null
    const userId = decodedToken?.userId
    if (!token) {
      throw new Error('JWT token not found');
    }

    const url = `https://fs14-ecommerce.herokuapp.com/api/v1/carts/${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
  } catch (error) {
    console.log('Error fetching cart:', error);
  }
};
