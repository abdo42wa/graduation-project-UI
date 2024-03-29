import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react'
import { addSeller, getSeller } from '../reducers/sellerSlice';
import { useAppDispatch, useAppSelector } from '../store';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { ISeller } from '../interfaces/ISeller';
import Spinner from '../components/Spinner';
import { ProductCard } from '../product/ProductCard';
import { getAllUserProducts, getAllUserProductsWaiting, getAllUserProductsRejected } from '../reducers/productSlice';
import Menu from '../components/Menu';
import { useParams } from 'react-router-dom';

const SellerShop = () => {
    const { rejected } = useParams();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const { products, isLodging: log } = useAppSelector((state) => state.products);
    console.log(rejected)
    useEffect(() => {
        if (user?.type === "SELLER") {

            dispatch(getSeller())
        }

        if (!rejected)

            dispatch(getAllUserProducts())


    }, [dispatch, user, rejected])

    useEffect(() => {

        if (rejected === 'rejected') {
            dispatch(getAllUserProductsRejected())
        }
    }, [dispatch, rejected])

    useEffect(() => {

        if (rejected === 'pending') {
            dispatch(getAllUserProductsWaiting())
        }
    }, [dispatch, rejected])




    const createSeller = () => {
        const postObj: ISeller = {
            phoneNumber,
            image,
            bankAccount,
            fullLegalName
        }
        dispatch(addSeller(postObj))
    }

    const [phoneNumber, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [fullLegalName, setFullLegalName] = useState('')

    return (
        <Grid container>
            {user?.type === "SELLER" && <Menu />}
            <Grid item md={10}>
                {log ? (
                    <Spinner />
                ) :
                    user?.type === "SELLER" ? (
                        <Grid container spacing={4} p={5} >
                            <>
                                <Grid item md={12}>
                                    <Typography textAlign="center" mb={1} display="block" component="p" variant='h5'>Welcome to your shop</Typography>
                                </Grid>

                                {!products.length ? (<Grid item md={12}><Box sx={{ display: 'flex', justifyContent: 'center' }}><Typography sx={{ color: '#3c3b3b70', fontSize: '4em', fontFamily: 'fantasy' }} >Currently their are no products to display </Typography></Box></Grid>)
                                    : (products.map((product) => (
                                        <ProductCard discount={product.discount!} rejectedMessage={product.rejectedMessage!} isPublished={product.isPublished!} _id={product._id} name={product.name} image={product.image} price={product.price!} key={product._id} isOwner={true} />)
                                    ))}

                            </>
                        </Grid>


                    ) : (
                        <Box justifyContent='center' display='flex'>
                            <Box >
                                <Typography mt={9} mb={9} display="block" component="p" variant='h6'>You currently do not have a shop if you would like to start your business please create one:</Typography>
                                <Paper sx={{ p: "1.5rem", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                    <Stack maxWidth="46%" mt={5} direction="column" spacing={2} mb={2} >
                                        <TextField label="Image URL" type='text' value={image} variant="outlined" onChange={(e) => setImage(e.target.value)} />
                                        <TextField label="Bank account number" type='text' value={bankAccount} variant="outlined" onChange={(e) => setBankAccount(e.target.value)} />
                                        <TextField label="Full legal Name" type='text' value={fullLegalName} variant="outlined" onChange={(e) => setFullLegalName(e.target.value)} />

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

            </Grid>

        </Grid>
    )
}

export default SellerShop