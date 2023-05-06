import { useNavigate } from 'react-router-dom'
import AuthContext from '../../react/context/AuthContext'
import React, { useContext, useState } from 'react'
import { findMatchingSearch } from '../../logicfx/userUtil'
import { useSearchContext } from '../../react/context/SerachContext'
import { Produx } from '../../Data/Produx'
import { Avatar, Badge, Menu, MenuItem } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { stateProps } from '../../redux/reducers/productReducer'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import './style/NavBar2.scss'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export const NavBar2 = () => {
  const navigate = useNavigate()
  const { product, setProduct } = useSearchContext()
  const { cart } = useSelector((state: RootState): stateProps => state.products)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Auth users
  const { user } = useContext(AuthContext)
  // handleSearch
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const input = {
      searchInput: data.get('userSearch') as string,
    }
    const matchingSearch = findMatchingSearch(input.searchInput, Produx)
    if (matchingSearch) {
      setProduct(matchingSearch)
      console.log(matchingSearch)
      navigate('/search')
    } else {
      console.log('No data found')
    }
  }
  //   Hanled MenuClicked
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
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
              <Avatar alt="user-avatar" src={user?.image} />
            </div>
            <div className="welcome__container"></div>
            <h3> {user ? <p>Welcome {user.firstName}!</p> : <p>Welcome, guest!</p>} </h3>
          </div>
        </div>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              navigate('/signin')
            }}
          >
            Logout
          </MenuItem>
          {user?.isAdmin && (
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
