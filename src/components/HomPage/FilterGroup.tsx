import React from 'react'
import { ProductProps } from '../../type/Product/ProductProps'
import { sortProductByCategory, sortProductsByRemove } from '../../utils/productUtil'
import { Link } from 'react-router-dom'
import MultiActionAreaCard from './MultiActionAreaCard'

export default function FilterGroup({
  products,
  className,
}: {
  products: ProductProps[]
  className: string
}) {
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = React.useState<ProductProps[]>([])
  const [updatedProducts, setUpdatedProducts] = React.useState<ProductProps[]>([])
  // const { products } = useSelector((state: RootState) => state.products)

  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category)
  }

  React.useEffect(() => {
    if (categoryFilter !== null) {
      setFilteredProducts(sortProductByCategory(updatedProducts, categoryFilter))
    } else {
      setFilteredProducts(updatedProducts)
    }
  }, [updatedProducts, categoryFilter])
  // Produx after added or removed or unremoved
  // useEffect group
  React.useEffect(() => {
    setUpdatedProducts(sortProductsByRemove(products))
  }, [products])
  return (
    <div className="left">
      <div className="buttongroup">
        <button onClick={() => handleCategoryFilter('Motherboard')}>Motherboard</button>
        <button onClick={() => handleCategoryFilter('Smartphone')}>Smartphone</button>
        <button onClick={() => handleCategoryFilter(null)}>All</button>
      </div>
      <div className="right">
        <div className="category__group">
          <div className="list__card">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <MultiActionAreaCard
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.thumbnail}
                  className="multicard"
                  price={`${product.price} €`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
