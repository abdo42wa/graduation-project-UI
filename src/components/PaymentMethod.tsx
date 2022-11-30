import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Box } from '@mui/system'

type PaymentMethodProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>

}

const PaymentMethod = ({ value, setValue }: PaymentMethodProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" required>Select Payment method</FormLabel>
                <RadioGroup
                    defaultValue='Strip'
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Strip" control={<Radio />} label="Strip" />
                    <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />

                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default PaymentMethod