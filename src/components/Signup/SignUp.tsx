// MUI
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CircularProgress } from '@mui/material'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { RootState } from '../../redux/store'
// Hard data
import { admins } from '../../Data/Admins'

// React
import { useNavigate } from 'react-router-dom'
import * as React from 'react'

// Style
import '../Login/style/signin.scss'
import { setToken, setWarning } from '../../redux/actions/getToken'
import { signin } from '../../utils/signin'
import { signup } from '../../utils/signup'

const theme = createTheme()

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formElements = event.currentTarget as HTMLFormElement
    const { username, password, firstname, avatar } = formElements.elements as unknown as {
      username: { value: string }
      password: { value: string }
      firstname: { value: string }
      avatar: { value: string }
    }
    dispatch(signup(username.value, password.value, firstname.value, avatar.value, navigate))
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="form">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="firstname"
                  label="Firstname"
                  id="firstname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="avatar"
                  label="Avatar"
                  id="avatar"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  )
}
