// React
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Redux
import { AppDispatch } from './redux/store'
import { useDispatch } from 'react-redux'

// Context and database
import SearchContext from './react/context/SerachContext'
import { ProductProps } from './type/Product/ProductProps'

// Components
import SignIn from './components/Login/SignIn'
import HomePage from './components/HomePage/HomePage'
import SearchResult from './components/SearchResult/SearchResult'
import ProductDetail from './components/ProductDetail/ProductDetail'
import AdminPannel from './components/Adminpannel/AdminPannel'
// import Cart from './components/Cart/Cart'
import Cart from './components/Cart/Cart'
import Dashboard from './components/Dashboard/Dashboard'
import MostVisit from './components/MostVisit/MostVisit'
import SignUp from './components/Signup/SignUp'

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = React.useState<ProductProps[] | null>(null)
  const [count, setCount] = React.useState<number | null>(null)

  // check users exist in Local Storage

  return (
    <Router>
      <SearchContext.Provider value={{ product, setProduct }}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/adminpannel" element={<AdminPannel />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mostvisit" element={<MostVisit />} />
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </SearchContext.Provider>
    </Router>
  )
}

export default App
