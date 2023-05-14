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
import './style/signin.scss'
import { setToken, setWarning } from '../../redux/actions/getToken'
import { signin } from '../../utils/signin'

const theme = createTheme()

export default function SignIn() {
  const navigate = useNavigate()
  // default declaration
  const dispatch = useDispatch<AppDispatch>()
  // const { isWarning } = useSelector((state: RootState) => state.isWarning)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formElements = event.currentTarget as HTMLFormElement
    const { username, password } = formElements.elements as unknown as {
      username: { value: string }
      password: { value: string }
    }
    dispatch(signin(username.value, password.value, navigate))
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
                Sign in
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
        {/* <div>
          <div className="loading">{isWarning ? <CircularProgress /> : <h1></h1>}</div>
        </div> */}
      </div>
    </ThemeProvider>
  )
}
