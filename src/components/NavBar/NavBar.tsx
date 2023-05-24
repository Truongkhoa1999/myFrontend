import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
// import { findMatchingSearch } from '../../logicfx/userUtil'
import { useSearchContext } from '../../react/context/SerachContext'
import { Avatar, Badge, Menu, MenuItem } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { ProductState } from '../../redux/reducers/getProductsReducer'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import './style/NavBar2.scss'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import jwtDecode from 'jwt-decode'
import { DecodedToken } from '../../type/DecodedToken/DecodedToken'
import { setToken } from '../../redux/actions/getToken'

export default function NavBar2() {
  const navigate = useNavigate()
  const { setProduct } = useSearchContext()
  const { cart } = useSelector((state: RootState) => state.cart)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { token } = useSelector((state: RootState) => state.token)
  const dispatch = useDispatch()
  // Auth users
  const decodedToken = token ? (jwtDecode(token) as DecodedToken) : null

  // Check if token in redux store still available
  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem('jwt')
      if (storedToken) {
        // Token found in browser storage, store it in Redux store
        dispatch(setToken(storedToken))
        const userName = decodedToken?.userName
      }
    }
  }, [dispatch, token])
  if (!decodedToken) {
    console.log('Invalid JWT token')
  } else {
    const userName = decodedToken.userName
  }
  // handleSearch
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const input = {
      searchInput: data.get('userSearch') as string,
    }
    // Make API for searching mechanism
    fetch(`http://localhost:8080/api/v1/products/search?q=${input.searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data)
        console.log(data)
        // Naviagte to search page
        navigate('/search')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //   Hanled MenuClicked
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  function handleMenuClose() {
    setAnchorEl(null)
  }
  function refactorLocalstorage() {
    localStorage.removeItem('jwt')
  }

  return (
    <div className="navbar__container">
      {/* left gorup */}
      <div className="left">
        <div
          className="logo__container"
          onClick={() => {
            navigate('/homepage')
          }}
        >
          <h2>everyThing</h2>
        </div>
      </div>

      {/* middle group */}
      <div className="mid">
        <div className="search__container">
          <form onSubmit={handleSearch}>
            <input type="input" name="userSearch" placeholder="Search products..." />
          </form>
        </div>
      </div>

      {/* right groups */}
      <div className="right">
        <div className="cart__container2">
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCart
              onClick={() => {
                navigate('/cart')
              }}
            />
          </Badge>
        </div>
        <div className="profile__container" onClick={handleMenuClick}>
          <div className="avatagroup">
            <div className="avatar_container">
              <Avatar alt="user-avatar" src={decodedToken?.avatar} />
            </div>
            <div className="welcome__container"></div>
            <h3>
              {' '}
              {decodedToken ? (
                <p>Welcome {decodedToken?.userName}!</p>
              ) : (
                <p>Welcome, guest!</p>
              )}{' '}
            </h3>
          </div>
        </div>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              refactorLocalstorage()
              navigate('/signin')
            }}
          >
            Sign Out
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              navigate('/dashboard')
            }}
          >
            Dashboard
          </MenuItem>
          {decodedToken?.role == 'ADMIN' && (
            <MenuItem
              onClick={() => {
                handleMenuClose()
                navigate('/adminpannel')
              }}
            >
              Admin Pannel
            </MenuItem>
          )}
        </Menu>
      </div>
    </div>
  )
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
