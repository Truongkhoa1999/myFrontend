// style
import './style/AdminPannel.scss'

// Components
import Ban from '../Ban/Ban'
import { NavBar2 } from '../NavBar/NavBar2'
import { Footer } from '../Footer/Footer'
import AddorRemove from '../AddorRemove/AddorRemove'

const AdminPannel = () => {
  return (
    <div className="content__container">
      {/* nav */}
      <div className="nav__container">
        <NavBar2 />
      </div>
      <AddorRemove />
      <div className="bangroup">
        <Ban />
      </div>
      {/* footer */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  )
}

export default AdminPannel
