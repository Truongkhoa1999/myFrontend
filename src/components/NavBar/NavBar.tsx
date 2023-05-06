// React
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
// MUI
import { styled } from '@mui/material/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from '@mui/material'
import { ShoppingCart, Person } from '@mui/icons-material'
import AuthContext from '../../react/context/AuthContext'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { stateProps } from '../../redux/reducers/productReducer'
import { findMatchingSearch } from '../../logicfx/userUtil'
import { useSearchContext } from '../../react/context/SerachContext'

// AppBar props
interface Props {
  className?: string
}
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#E59A59',
  color: '#000',
  height: '80px', // set height to 80px
  display: 'flex',
  justifyContent: 'center', // center the logo and search bar horizontally
})

const LogoContainer = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center', // center logo vertically
})

const StyledTypography = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
})

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '4px',
  paddingLeft: '8px',
  paddingRight: '8px',
  marginLeft: '32px',
  flexGrow: 1,
  height: '50px',
  maxWidth: '500px', // set maximum width for search bar
})

const StyledInput = styled('input')({
  border: 'none',
  width: '100%',
  height: '50%',
  marginRight: '8px',
})
const WelcomeContainer = styled('div')({
  display: 'flex',
  flexGrow: 0,
  color: '#fff', // set text color to white
  fontSize: '1rem', // set font size to 1rem
  fontWeight: 600, // set font weight to 500
  textTransform: 'capitalize', // capitalize the text
  marginRight: '32px', // add margin to separate from search bar
  '@media (max-width: 768px)': {
    display: 'none', // hide on smaller screens
  },
})

// Main function goes here
const StyledIconButton = styled(IconButton)({
  color: '#fff',
})
const Navbar = ({ className }: Props): JSX.Element => {
  // Basic const
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const { user } = useContext(AuthContext)
  const { products, cart } = useSelector((state: RootState): stateProps => state.products)
  console.log(cart)
  const { product, setProduct } = useSearchContext()

  // Increase quantity in cart
  // function groups

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const input = {
      searchInput: data.get('userSearch') as string,
    }
    const matchingSearch = findMatchingSearch(input.searchInput, products.data)
    if (matchingSearch) {
      setProduct(matchingSearch)
      console.log(matchingSearch)
      navigate('/search')
    } else {
      console.log('No data found')
    }
  }
  const navigateHome = () => {
    navigate('/homepage')
  }
  return (
    <StyledAppBar position="absolute" elevation={0}>
      <Toolbar>
        <LogoContainer onClick={navigateHome}>
          <StyledTypography variant="h1">everyThing</StyledTypography>
        </LogoContainer>
        <WelcomeContainer>
          {user ? <p>Welcome {user.firstName}!</p> : <p>Welcome, guest!</p>}{' '}
        </WelcomeContainer>
        <Box component="form" onSubmit={handleSearch}>
          <SearchContainer>
            <StyledInput type="input" name="userSearch" placeholder="Search products..." />
          </SearchContainer>
        </Box>
        <StyledIconButton>
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCart
              onClick={() => {
                navigate('/cart')
              }}
            />
          </Badge>
        </StyledIconButton>

        <StyledIconButton onClick={handleMenuClick}>
          <Avatar alt="user-avatar" src={user?.image} />
        </StyledIconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              navigate('/signin')
            }}
          >
            Logout
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              navigate('/productlist')
            }}
          >
            Add or remove
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
      </Toolbar>
    </StyledAppBar>
  )
}

export default Navbar
