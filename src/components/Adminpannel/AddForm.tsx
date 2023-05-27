import { useState } from 'react'
import { RequestProductProps } from '../../type/Product/RequestProductProps'
import './style/AddForm.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { addProduct } from '../../redux/actions/addProduct'
export default function AddForm() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const dispatch = useDispatch<AppDispatch>()

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

  return (
    <div className="addgroup">
      <h2>Add New Product</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title" >Title *</label>
        <input className='text' type="text" id="title" name="title" required  placeholder="Enter the product title (up to 200 characters)"  />
        <label htmlFor="description">Description *</label>
        <textarea className='text' id="description" name="description" required placeholder="Enter the product title (up to 200 characters)"  />
        <label htmlFor="price">Price *</label>
        <input className='text' type="number" id="price" name="price" required  placeholder="Enter the product title (up to 200 characters)" />
        <label htmlFor="brand">Brand *</label>
        <input className='text' type="text" id="brand" name="brand" required placeholder="Enter the product title (up to 200 characters)"  />
        <label htmlFor="thumbnail">Thumbnail URL *</label>
        <input className='text' type="url" id="thumbnail" name="thumbnail" required  placeholder="Enter the product title (up to 200 characters)" />
        <label htmlFor="images">Image URLs *</label>
        <input className='text' type="text" id="images" name="images" required  placeholder="Enter the product title (up to 200 characters)" />
        <div>
          <label htmlFor="smartphone">Smartphone</label>
          <input
            type="checkbox"
            id="smartphone"
            name="categories"
            value="5091ffff-8adb-489c-95b5-c57662c73c56"
            checked={selectedCategory === '5091ffff-8adb-489c-95b5-c57662c73c56'}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <br/>
          <label htmlFor="furniture">Furniture</label>
          <input
            type="checkbox"
            id="furniture"
            name="categories"
            value="d2cb875e-e42e-4827-bbdc-c94c8216ebe7"
            checked={selectedCategory === 'd2cb875e-e42e-4827-bbdc-c94c8216ebe7'}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <br/>
          <label htmlFor="peripherals">Peripherals</label>
          <input
            type="checkbox"
            id="peripherals"
            name="categories"
            value="858bc29b-073d-4e00-8af2-2e0f6813392d"
            checked={selectedCategory === '858bc29b-073d-4e00-8af2-2e0f6813392d'}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <br/>
          <label htmlFor='quantity'>Quantity</label>
          <br/>
          <input className='text' type="number" id="quantity" name="quantity" required />
        </div>{' '}
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}
