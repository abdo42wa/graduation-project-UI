import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Box } from '@mui/system'

const PaymentMethod = () => {
    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Select Payment method</FormLabel>
                <RadioGroup
                    defaultValue="Strip"
                >
                    <FormControlLabel value="Strip" control={<Radio />} label="Strip" />
                    <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />

                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default PaymentMethod