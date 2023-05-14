import React, { createContext, useContext } from 'react'
import { ProductProps } from '../../type/Product/ProductProps'

export type SearchContextType = {
  product: ProductProps[] | null
  setProduct: (product: ProductProps | any) => void
}
const SearchContext = createContext<SearchContextType>({
  product: null,
  setProduct: () => {},
})
export const useSearchContext = () => {
  return useContext(SearchContext)
}
export default SearchContext
