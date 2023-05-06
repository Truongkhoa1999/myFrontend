// React
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Redux
import { AppDispatch } from './redux/store'
import { useDispatch } from 'react-redux'
import { fetchUsers, LOCAL_USER } from './redux/actions/users'

// Context and database
import AuthContext from './react/context/AuthContext'
import SearchContext from './react/context/SerachContext'
import { User } from './type/User/User'
import { Product } from './type/Products/products'

// Components
import SignIn from './components/Login/SignIn'
import HomePage from './components/HomPage/HomePage'
import SearchResult from './components/SearchResult/SearchResult'
import ProductDetail from './components/ProductDetail/ProductDetail'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminPannel from './components/Adminpannel/AdminPannel'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = React.useState<User | null>(null)
  const [product, setProduct] = React.useState<Product[] | null>(null)
  const [count, setCount] = React.useState<number | null>(null)

  // check users exist in Local Storage
  React.useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem(LOCAL_USER) || 'null')

    localUser && setUser(localUser)
    // fetch user
    dispatch(fetchUsers())
  }, [])
  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <SearchContext.Provider value={{ product, setProduct }}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/adminpannel"
              element={
                <ProtectedRoute>
                  <AdminPannel />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Routes>
        </SearchContext.Provider>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
