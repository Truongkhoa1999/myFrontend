// React
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Redux
import { AppDispatch } from './redux/store'
import { useDispatch } from 'react-redux'

// Context and database
import AuthContext from './react/context/AuthContext'
import { User } from './type/User/User'

// Components

import HomePage from './components/HomPage/HomePage'
import ProductDetail from './components/ProductDetail/ProductDetail'

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = React.useState<User | null>(null)
  const [count, setCount] = React.useState<number | null>(null)

  // check users exist in Local Storage

  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
