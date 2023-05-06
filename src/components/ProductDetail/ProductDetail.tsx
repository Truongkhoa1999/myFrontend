// React and Redux
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { stateProps } from '../../redux/reducers/productReducer'
import { addItemToCart } from '../../redux/actions/products'

// Data and type
import { Product } from '../../type/Products/products'
import { Produx, ProduxProps } from '../../Data/Produx'

// Style
import './style/ProductDetail.scss'

// Components
import { Footer } from '../Footer/Footer'
import { NavBar2 } from '../NavBar/NavBar2'
import MultiActionAreaCard from '../HomPage/MultiActionAreaCard'
import { saveCart } from '../../redux/actions/products'
import { useState } from 'react'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { products } = useSelector((state: RootState): stateProps => state.products)
  const dispatch = useDispatch<AppDispatch>()
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  // const [updatedProdux, setUpdatedProdux] = useState<ProduxProps[]>([])
  const produx = useSelector((state: RootState) => state.produx)
  const { cart } = useSelector((state: RootState) => ({
    cart: state.products.cart,
  }))
  let product: Product | undefined
  const [mainImage, setMainImage] = useState<string | null>(null)

  if (products.data.length > 0) {
    // If `products` exists, find the product based on its `id`
    product = products.data.find((item) => item.id === Number(id))

    console.log(product)
  } else {
    // If `products` doesn't exist, find the product based on its `id` in `Produx`
    const produx = Produx.find((item) => item.id === Number(id))

    product = produx
  }

  const relevantProducts = produx.filter(
    (p) => p.category === product?.category && !p.status.isRemoved
  )

  if (!product) {
    return <div>Product not found</div>
  }
  // add item to cart
  const handleAddItem = () => {
    dispatch(addItemToCart(product?.id!))
    dispatch(saveCart(cart))
  }
  // hover effect
  const handleImageHover = (image: string) => {
    setMainImage(image)
  }
  return (
    <div className="container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>

      <div className="product-detail-container">
        <div className="img__container">
          <img className="main" src={mainImage ?? product.images[0]}></img>
          <div className="detailImage">
            <img
              className="second"
              onClick={() => handleImageHover(product!.images[1])}
              src={product.images[1]}
            ></img>
            <img
              className="third"
              onClick={() => handleImageHover(product!.images[2])}
              src={product.images[2]}
            ></img>
            <img
              className="fourth"
              onClick={() => handleImageHover(product!.images[3])}
              src={product.images[3]}
            ></img>
          </div>
        </div>
        <div className="content-container">
          <h1>{product.title}</h1>
          <p>{`category: ${product.category} - Brand: ${product.brand}`}</p>
          <h2>{`${product.price} € `}</h2>
          <p>{product.description}</p>
          <button onClick={handleAddItem}>Add to cart</button>
        </div>
      </div>
      {/* Relevant products */}
      <div className="relevant__products">
        <h1>Relevant items</h1>
        <div className="listcard">
          {relevantProducts.map((product) => (
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
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default ProductDetail
