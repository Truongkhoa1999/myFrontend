// React & Redux
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { v4 as uuidv4 } from 'uuid'

// style
import '../Adminpannel/style/AdminPannel.scss'

// Data type
import { ProduxProps } from '../../Data/Produx'
import { deleteProductsById } from '../../redux/actions/deleteProductById'
import { ProductProps } from '../../type/Product/ProductProps'
import { AnyAction } from 'redux'
import { restoreProductsById } from '../../redux/actions/restoreProductById'
import { fetchProducts } from '../../redux/actions/getProducts'
import { addProduct } from '../../redux/actions/addProduct'
import { RequestProductProps } from '../../type/Product/RequestProductProps'

// Components

const AddorRemove = () => {
  const { products } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  // Manupulate products render
  // const [newProduct, setNewProduct] = useState<ProduxProps>({
  //   id: 0,uiy
  //   title: '',
  //   description: '',
  //   price: 0,
  //   brand: '',
  //   category: '',
  //   thumbnail: '',
  //   images: [],
  //   status: { isRemoved: false, isArrival: true },
  // })
  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleRemoved = (id: ReturnType<typeof uuidv4>) => {
    dispatch(deleteProductsById(id))
  }
  const handleUnRemoved = (id: ReturnType<typeof uuidv4>) => {
    dispatch(restoreProductsById(id))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Retrieve the form data here
    const formData = new FormData(e.currentTarget)
    const productData: RequestProductProps = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      brand: formData.get('brand') as string,
      categoryId: selectedCategory,
      thumbnail: formData.get('thumbnail') as string,
      images: [formData.get('images') as string],
      removed: false,
      quantity: Number(formData.get('quantity')),
    }

    // Dispatch the addProduct action with the product data
    dispatch(addProduct(productData))

    // Clear the form or perform any other necessary actions
    // For example:
    e.currentTarget.reset()
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target
  //   setNewProduct({ ...newProduct, [name]: value })
  // }

  // make this filteredProducts be updated whenever new staus comes
  useEffect(() => {
    // setFilteredProducts(products.filter((p) => !p.removed || p.status.isArrival))
    setFilteredProducts(products.filter((p) => !p.removed))
  }, [products])

  // Checkboxes for category

  return (
    <div>
      {/* remove or un remove and upadte render list */}
      <div className="updateGroup">
        <div className="tablegroup">
          <table className="product">
            <thead>
              <tr>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="product">
                  <td>{product.title}</td>
                  <td>
                    <button
                      className={product.status?.isRemoved ? 'active' : ''}
                      onClick={() => handleRemoved(product.id)}
                    >
                      Removed
                    </button>
                    <button
                      className={product.status?.isRemoved ? '' : 'active'}
                      onClick={() => handleUnRemoved(product.id)}
                    >
                      Unremoved
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="product-list">
          <h1 className="product-list__title">Updated List Items</h1>
          <div className="product-list__items">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div className="product-list__item" key={p.id}>
                  <img className="product-list__item-image" src={p.thumbnail} alt={p.title} />
                  <div className="product-list__item-details">
                    <h2 className="product-list__item-title">{p.title}</h2>
                    <p className="product-list__item-description">{p.description}</p>
                    <p className="product-list__item-price">{p.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="product-list__empty">There is nothing left</h1>
            )}
          </div>
        </div>
        {/* add groupd */}
        <div className="addgroup">
          <h2>Add New Product</h2>
          <form className="form" onSubmit={handleSubmit}>
            {/* <label htmlFor="id">ID:</label>
            <input type="number" id="id" name="id" required /> */}
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" required />
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" required />
            <label htmlFor="brand">Brand:</label>
            <input type="text" id="brand" name="brand" required />
            <label htmlFor="thumbnail">Thumbnail URL:</label>
            <input type="url" id="thumbnail" name="thumbnail" required />
            <label htmlFor="images">Image URLs:</label>
            <input type="text" id="images" name="images" required />
            <div>
              <input
                type="checkbox"
                id="smartphone"
                name="categories"
                value="8c5c510c-089d-4220-b57b-056c46f0af95"
                checked={selectedCategory === '8c5c510c-089d-4220-b57b-056c46f0af95'}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <input type="number" id="quantity" name="quantity" required />
              <label htmlFor="smartphone">Smartphone</label>
            </div>{' '}
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddorRemove
