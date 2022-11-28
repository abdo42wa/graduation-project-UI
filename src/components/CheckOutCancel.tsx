import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const CheckOutCancel = () => {
    return (
        <Box display="flex" justifyContent="center" textAlign="center">

            <Typography component="div" variant="h1">The payment was successfully pressed</Typography>
            <Typography>You gan receive an confirmation email shortly </Typography>
        </Box>
    )
}

export default CheckOutCancel