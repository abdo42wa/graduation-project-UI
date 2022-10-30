import { Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"


const CreateProduct = () => {
    return (
        <Grid container justifyContent="center" display='flex'>
            <Box>
                <Typography variant="h2" my={5} display="block" component="h1">Create Product</Typography>
                <Stack direction="row" spacing={2} mb={2} >
                    <TextField fullWidth label="Name" variant="outlined" />
                </Stack>
                <Stack direction="row" spacing={2} mb={2}>
                    <TextField fullWidth label="Price" type='number' variant="outlined" InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }} />
                </Stack>
                <Stack direction="row" spacing={2} mb={2} >
                    <TextField fullWidth label="Category" variant="outlined" />
                </Stack>
                <Stack direction="row" spacing={2} mb={2} >
                    <TextField fullWidth label="Brand" variant="outlined" />
                </Stack>
                <Stack direction="row" spacing={2} mb={2} >
                    <TextField fullWidth minRows={3} label="discription" variant="outlined" multiline />
                </Stack>
            </Box>
        </Grid>
    )
}

export default CreateProduct