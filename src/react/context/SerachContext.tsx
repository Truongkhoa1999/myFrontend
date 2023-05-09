import React, { createContext, useContext } from 'react'
import { Product } from '../../type/Products/ProductProps'

export type SearchContextType = {
  product: Product[] | null
  setProduct: (product: Product | any) => void
}
const SearchContext = createContext<SearchContextType>({
  product: null,
  setProduct: () => {},
})
export const useSearchContext = () => {
  return useContext(SearchContext)
}
export default SearchContext
