
import NavBar2 from '../NavBar/NavBar'
import AddorRemove from '../AddorRemove/AddorRemove'
import Remove from './Remove'
import { useEffect } from 'react'
import { fetchProducts } from '../../redux/actions/getProducts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ProductProps } from '../../type/Product/ProductProps'
// import AddorRemove from '../AddorRemove/AddorRemove'
import'./style/AdminPannel.scss'
import AddForm from './AddForm'
import Footer from '../Footer/Footer'
const AdminPannel = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)

  // Fetch products
  useEffect (() => {
    dispatch(fetchProducts())
  },[])
  return (
    <div className="content__container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
       <Remove products={products} />
       <AddForm />
      {/* footer */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default AdminPannel
