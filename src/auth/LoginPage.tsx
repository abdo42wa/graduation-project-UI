import { Google } from '@mui/icons-material'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, setIsAuthenticated } from '../reducers/userSlice'
import { useAppDispatch, useAppSelector } from '../store'
import { IUser } from './UserType'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useNavigate();
    const dispatch = useAppDispatch();
    const { currentUsername, isLodging, error } = useAppSelector(state => state.user)
    useEffect(() => {
        if (currentUsername) {
            history('/')
        }
    }, [history, currentUsername])

    const handelLogin = () => {
        const postObj: IUser = {
            email,
            password
        }
        dispatch(login(postObj))
    }
    const loginWithGoogle = async () => {
        let timer: NodeJS.Timeout | null = null;
        const googleURL = "http://localhost:5000/auth/google";
        const newWindow = window.open(
            googleURL,
            "_blank",
            "width=500,height=600");

        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    localStorage.setItem('userInfo', currentUsername!);
                    dispatch(setIsAuthenticated('true'))
                    if (timer) clearInterval(timer)
                }
            })
        }
    }
    return (
        <Grid container justifyContent='center' display='flex' my={5} >
            <h2>{error && "fake user go a way"}</h2>
            <Paper elevation={3} sx={{ padding: '30px' }}>
                <Typography p={2} variant="subtitle1">Do not have an account? <Link to='/signup'>Sign up</Link>  </Typography>
                <Typography p={2} component="h1" variant="h5">Login</Typography>
                <TextField sx={{ m: 2 }} fullWidth label="Email" required value={email} type='email' variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField sx={{ m: 2 }} fullWidth label="Password" type='password' value={password} variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                <Button sx={{ m: 2 }} fullWidth variant='contained' onClick={handelLogin}>Login</Button>
                <Button startIcon={<Google />} sx={{ m: 2 }} color="error" fullWidth variant='contained' onClick={loginWithGoogle}>Google</Button>
            </Paper>
            {isLodging && <h1>Lodging....</h1>}
        </Grid>
    )
}

export default LoginPage