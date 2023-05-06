import React from 'react'
import {Button, TextField, Grid, Container }from '@mui/material';

const LoginPage = () => { 
    return (
        <Container sx={{paddingTop: "10px"}}>
          <Grid
            container
            spacing={3}
            direction={'column'}
            justify={'center'}
            alignItems={'center'}
          >
            <h2>Login</h2>
            <Grid item xs={12}>
              <TextField label="Username"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password" type={'password'}></TextField>
            </Grid>

            </Grid>
            <Grid item xs={12}>
              <Button fullWidth> Login </Button>
            </Grid>
        </Container>
    );
  };
  
  export default LoginPage;