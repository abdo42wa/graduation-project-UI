import { Container, Grid, Paper, TextField, Typography, Stack, Button } from '@mui/material'

function SignupPage() {
    return (
        <Grid container justifyContent='center' display='flex' my={5} >
            <Paper elevation={3} sx={{ padding: '30px' }}>

                <Typography p={2} component="h1" variant="h5">Sign in</Typography>
                <TextField sx={{ m: 2 }} fullWidth label="Display Name" type='text' variant="outlined" />
                <TextField sx={{ m: 2 }} fullWidth label="Email" type='email' variant="outlined" />
                <TextField sx={{ m: 2 }} fullWidth label="Password" type='password' variant="outlined" />
                <TextField sx={{ m: 2 }} fullWidth label="Confirm Password" type='password' variant="outlined" />
                <Button sx={{ m: 2 }} fullWidth variant='contained'>Sign UP</Button>
            </Paper>
        </Grid>
    )
}

export default SignupPage