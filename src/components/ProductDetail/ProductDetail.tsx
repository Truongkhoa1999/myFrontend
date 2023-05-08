import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import { fetchProductsById } from '../../redux/actions/products'
import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import './style/ProductDetail.scss'
import { Footer } from '../Footer/Footer'
import CustomAppBar from '../NavBar/CustomAppBar'

export default function ProductDetail() {
  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.selectedProduct
  )
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: ReturnType<typeof uuidv4> }>()
  const [selectedImage, setSelectedImage] = useState<string | undefined>(selectedProduct?.images[0]) // state to keep track of the selected image

  // Fetch products
  useEffect(() => {
    if (id) {
      dispatch(fetchProductsById(id))
    }
  }, [dispatch, id])

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <div>{error}</div>
  }

  // handle image hover
  const handleImageHover = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <div className="container">
      {/* Navbar */}
      <div className="nav__container">
        <CustomAppBar />
      </div>
      {/* Content */}
      <div className="content_wrapper">
        <div className="content_details">
          <div className="content_picture">
            <div className="left_image">
              {selectedProduct?.images.map((image) => (
                <img key={image} src={image} onMouseOver={() => handleImageHover(image)} />
              ))}
            </div>
            <div className="right_image">
              <img src={selectedImage} />
            </div>
          </div>
        </div>
        <div className="content_summary">
          <h1>{selectedProduct?.title}</h1>
          <h3>{selectedProduct?.price}</h3>
          <p>including VAT24%</p>
          <button disabled={selectedProduct?.quantity === 0}>ADD TO BASKET</button>
        </div>
      </div>
      {/* Footer */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}
