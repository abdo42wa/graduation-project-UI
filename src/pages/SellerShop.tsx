import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react'
import { addSeller, getSeller } from '../reducers/sellerSlice';
import { useAppDispatch, useAppSelector } from '../store';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { ISeller } from '../interfaces/ISeller';

const SellerShop = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    useEffect(() => {
        if (user?.type === "SELLER")
            dispatch(getSeller())
    }, [dispatch, user])

    const createSeller = () => {
        const postObj: ISeller = {
            phoneNumber,
            image
        }
        dispatch(addSeller(postObj))
    }

    const [phoneNumber, setPhone] = useState('')
    const [image, setImage] = useState('')

    return (
        <>
            {user?.type === "SELLER" ? (

                <div>SellerShop</div>
            ) : (
                <Box justifyContent='center' display='flex'>
                    <Box >
                        <Typography mt={9} mb={9} display="block" component="p" variant='h6'>You currently do not have a shop if you would like to start your business please create one:</Typography>
                        <Paper sx={{ p: "1.5rem", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <Stack maxWidth="46%" mt={5} direction="column" spacing={2} mb={2} >
                                <TextField label="Image URL" type='text' value={image} variant="outlined" onChange={(e) => setImage(e.target.value)} />

                                <PhoneInput
                                    country={'lt'}
                                    value={phoneNumber}
                                    onChange={(newValue) => setPhone(newValue)}
                                />
                            </Stack>
                            <Button sx={{ alignSelf: "start" }} variant="contained" onClick={createSeller} >Create</Button>
                        </Paper>
                    </Box>

                </Box>
            )
            }

        </>
    )
}

export default SellerShop