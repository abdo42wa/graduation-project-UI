import { Typography } from "@mui/material"
import { Box } from "@mui/system"

const CheckOutSuccess = () => {
    return (
        <Box display="flex" justifyContent="center" textAlign="center">

            <Box display="block">
                <Typography component="div" variant="h3">The payment was successfully pressed</Typography>
                <Typography>You gan receive an confirmation email shortly </Typography>
            </Box>
        </Box>
    )
}

export default CheckOutSuccess