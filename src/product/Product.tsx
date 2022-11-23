import { Button, CardContent, Divider, Grid, Rating, Typography, Card, CardMedia, Checkbox, IconButton } from "@mui/material"
import { useLocation } from 'react-router-dom';
import { ShoppingCart, FavoriteBorder, Favorite, Add, Remove } from '@mui/icons-material';
import { Box, Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getProductByID } from "../reducers/productSlice"
import { getAllReviewsWithProductID, getAvaregeRatingByProductId } from "../reducers/reviewSlice";
import ReviewForm from './ReviewForm'
import { toast } from "react-toastify";
import { decrementProduct, incrementProduct } from "../reducers/cartSlice";

const Product = () => {
    const location = useLocation();
    const [openReviewForm, setOpenReviewForm] = useState(false);
    const [checked, setChecked] = useState(false);

    const { singleProduct, isLoding } = useAppSelector(state => state.products)
    const { reviews, averageRating } = useAppSelector(state => state.reviews)
    const { currentUsername } = useAppSelector(state => state.user)
    const { cart } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch();


    const productID = location.pathname.split('/')[2];

    const productAmoutInCart = cart.find((x) => x._id === productID);
    useEffect(() => {
        dispatch(getProductByID(productID))
        dispatch(getAllReviewsWithProductID(productID))
        dispatch(getAvaregeRatingByProductId(productID))
        //react-hooks/exhaustive-deps
    }, [productID, dispatch])


    const handleClickOpen = () => {
        if (!currentUsername) {

            toast.warning('Please Login first')
        }
        setOpenReviewForm(true);
    };
    const handleClose = () => {
        setOpenReviewForm(false);
    };
    const handleAddToCartbyOne = () => {
        dispatch(incrementProduct(singleProduct!))
    };
    const handleAddTo = () => {
        if (!productAmoutInCart?.quantity)
            dispatch(incrementProduct(singleProduct!))
    };
    const handleRemoveFromCartByone = () => {
        dispatch(decrementProduct(singleProduct!))
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        console.log(checked)
    };
    return (

        <Grid container display="flex" justifyContent='center' mt={5}>
            {isLoding ? (
                <h1>Loding.....</h1>
            ) :
                <>
                    <Grid item lg={4}>
                        <Button variant="outlined" href="/">GO back</Button>
                        <Box sx={{ background: "white", mt: 4, boxShadow: "5px 5px 15px 5px black", borderRadius: 3, p: '150px', height: "400px", display: 'flex', justifyContent: 'center', overflow: 'hidden' }} >
                            <img max-width={300} loading="lazy" alt={singleProduct?.name} src={singleProduct?.image} />
                        </Box>

                    </Grid>
                    <Grid item lg={1} />
                    <Grid item lg={5} >
                        <Box sx={{ mt: 10, background: "white", p: 3, borderRadius: 3 }}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant='h2' fontSize="2rem">{singleProduct?.name}</Typography>
                                <Checkbox onChange={handleChange} checked={checked} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red" }} />} />
                            </Box>
                            <Stack spacing={3}>
                                {/* <Typography variant="body2" >{productInfo?.category}</Typography> */}
                                <Box display="flex" justifyContent='start' pt={2}>
                                    <Rating name="read-only" precision={0.5} value={!averageRating ? 0 : averageRating} readOnly /> <Typography component="span" sx={{ ml: 2 }}>{averageRating?.toFixed(1)}</Typography>
                                </Box>
                                <Typography fontWeight={500} >{singleProduct?.description}</Typography>

                                <Typography variant='h6'>Count In Stock: {singleProduct?.countInStock}</Typography>
                                <Typography >Brand: {singleProduct?.brand}</Typography>

                                {/* <Button variant="contained" size="large" color='secondary' endIcon={<FavoriteBorder />}>Add to wish list</Button> */}
                            </Stack>
                        </Box>
                        {/* Seler part */}
                        <Box sx={{ mt: 5, background: "white", p: 3, borderRadius: 3 }}>
                            <Typography variant="body1" component="span" >Seller</Typography>
                            <Box >
                                <Card sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ maxWidth: 100 }}
                                            image="https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0"
                                            alt="Live from space album cover"
                                        />
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" >
                                                {String(singleProduct?.user?.name)}
                                            </Typography>

                                        </CardContent>
                                    </Box>
                                </Card>
                            </Box>
                        </Box>
                        {/* Add to card part */}
                        <Box sx={{ mt: 5, background: "white", p: 3, borderRadius: 3 }}>
                            <Box sx={{ background: "rgba(34, 34, 34, 0.04)", borderRadius: 3, p: 3 }} display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography variant='h5'>Price: {singleProduct?.price} $</Typography>
                                <Button onClick={handleAddTo} disabled={singleProduct?.countInStock! == 0 ? true : false}
                                    variant="contained" size="large" sx={{
                                        borderRadius: 4, bgcolor: "#00CD66", ":hover": {
                                            backgroundColor: '#fff',
                                            color: '#3c52b2',
                                        },
                                    }} endIcon={<ShoppingCart />}>
                                    {productAmoutInCart ? (
                                        <>
                                            {/* worning because the Icon Button is in side a button */}
                                            <IconButton onClick={handleRemoveFromCartByone} >
                                                <Remove />
                                            </IconButton>
                                            {productAmoutInCart.quantity}
                                            <IconButton disabled={productAmoutInCart.quantity >= singleProduct?.countInStock!} onClick={handleAddToCartbyOne} >
                                                <Add />
                                            </IconButton>
                                        </>
                                    ) : 'Add to card'}
                                </Button>
                            </Box>
                        </Box>
                        {/* reviews part */}
                        <Box sx={{ mt: 5, background: "white", p: 3, borderRadius: 3 }}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant='h6' fontWeight="bold" p={2}>Reviews</Typography>
                                <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={handleClickOpen}>Write a review</Button>
                                {openReviewForm && <ReviewForm open={openReviewForm} onClose={handleClose} productID={productID} />}
                            </Box>
                            <Box>
                                {reviews.map((review) => {
                                    return (
                                        <Box key={review._id}>
                                            <Box display="flex" justifyContent='start' pt={2} >
                                                <Typography component="span" sx={{ mx: 2 }}>{review?.user?.name}</Typography> |
                                                <Rating name="read-only" precision={0.5} value={review.rating} readOnly sx={{ mx: 2 }} />
                                            </Box>
                                            <Typography p={2} variant="subtitle1" component="span" >{review.comment}</Typography>
                                            <Typography ml={2} color='gray' variant="subtitle2" component="p" >{String(review.createdAt).slice(0, 10)}</Typography>
                                            <Divider sx={{ p: 1 }} />
                                        </Box>

                                    )
                                })}
                            </Box>
                        </Box>

                    </Grid >
                </>
            }
        </Grid >
    )
}

export default Product