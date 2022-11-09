import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handelLogin = () => {
        console.log(email, password)
    }
    return (
        <Grid container justifyContent='center' display='flex' my={5} >
            <Paper elevation={3} sx={{ padding: '30px' }}>
                <Typography p={2} variant="subtitle1">Dont have an account? Sign up </Typography>
                <Typography p={2} component="h1" variant="h5">Login</Typography>
                <TextField sx={{ m: 2 }} fullWidth label="Email" required value={email} type='email' variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField sx={{ m: 2 }} fullWidth label="Password" type='password' value={password} variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                <Button sx={{ m: 2 }} fullWidth variant='contained' onClick={handelLogin}>Login</Button>
            </Paper>
        </Grid>
    )
}

export default LoginPage