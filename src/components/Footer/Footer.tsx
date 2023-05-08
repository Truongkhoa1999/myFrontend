import React, { FC, ReactElement } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'black',
        border: '2px soild white',

        paddingTop: '1rem',
        paddingBottom: '1rem',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      // position="absolute"
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="orange" variant="h5">
              everyThing
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="orange" variant="subtitle1">
              {`${new Date().getFullYear()} | React | MUI | TypeScript`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
