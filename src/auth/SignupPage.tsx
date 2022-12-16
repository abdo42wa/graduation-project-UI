import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { IUser } from './UserType';

function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.user)
    useEffect(() => {
        if (user) {
            history('/')
        }
    }, [history, user])


    const handelLogin = () => {
        const postObj: IUser = {
            name,
            email,
            password
        }
        dispatch(createUser(postObj))
        // history('/login')
    }
    return (
        <Grid container justifyContent='center' display='flex' my={5} >
            <Paper elevation={3} sx={{ padding: '30px' }}>
                <Typography p={2} variant="subtitle1">Do you have an account? <Link to='/login'>Login</Link>  </Typography>
                <Typography p={2} component="h1" variant="h5">Create Account</Typography>
                <TextField sx={{ m: 2 }} fullWidth label="Display Name" type='text' variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField sx={{ m: 2 }} fullWidth label="Email" type='email' variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField sx={{ m: 2 }} fullWidth label="Password" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                <TextField sx={{ m: 2 }} fullWidth label="Confirm Password" type='password' value={confirmPassword} variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button sx={{ m: 2 }} fullWidth variant='contained' onClick={handelLogin}>Sign UP</Button>
            </Paper>
        </Grid>
    )
}

export default SignupPage