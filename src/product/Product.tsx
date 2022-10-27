import { Button, Divider, Grid, Rating, TextField, Typography } from "@mui/material"
import products from "../data/ProductsData"
import { useLocation } from 'react-router-dom';
import { ShoppingCart, FavoriteBorder } from '@mui/icons-material';
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";

type Review = {
    author: string;
    body: string;
    date: string;
}

const fakeReviews = [
    {
        author: "Abdo Ahmed",
        body: "this is bad product",
        date: "2022-11-05"
    },
    {
        author: "Lukas Song",
        body: "fake review",
        date: "2022-11-25"
    },
    {
        author: "Pavlo Pidluzny",
        body: "this is fake good product",
        date: "2022-11-15"
    }
]

const Product = () => {
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [review, setReview] = useState<string>("");
    const [reviews, setReviews] = useState<Review[]>(fakeReviews);

    const handelRating = (e: React.ChangeEvent<{}>, newValue: number | null) => {
        setRatingValue(newValue);
    }
    const handelchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }

    const addReview = () => {

        setReviews(prevReview => [
            ...prevReview,
            { author: "Abdo Lukas", body: review, date: "2022-11-15" }
        ])
    }

    const location = useLocation();
    const productID = location.pathname.split('/')[2];
    const productInfo = products.find(product => product.id === Number(productID))
    return (
        <Grid container justifyContent='center' mt={5}>
            <Grid item lg={3}>
                <Button variant="outlined" href="/">GO back</Button>
                <Box sx={{ background: "white", mt: 4, boxShadow: "5px 5px 15px 5px black", borderRadius: 3, p: '150px', height: '250px', display: 'flex', justifyContent: 'center' }} >
                    <img width={300} loading="lazy" alt={productInfo?.name} src={productInfo?.image} />
                </Box>

                <Box sx={{ mt: 5, backgroundColor: 'wheat' }}>
                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >Rate the product:</Typography>
                            <Rating sx={{ p: 2, mt: 0.2 }} precision={0.5} value={ratingValue} onChange={handelRating} />
                        </Stack>
                    </Box>

                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >Leave a review:</Typography>
                            <TextField id="standard-basic" label="review" variant="standard" value={review} onChange={handelchange} />
                        </Stack>
                        <Button sx={{ m: 2 }} variant="contained" size="small" onClick={addReview}>Submit the review</Button>
                    </Box>
                    <Box>
                        {reviews.map((review) => {
                            return (
                                <>
                                <Box >
                                    <Typography p={2}  variant="subtitle1" component="span" >{review.author} :</Typography>
                                    <Typography p={2} variant="subtitle1" component="span" >{review.body}</Typography>
                                    <Typography ml={2} color='gray' variant="subtitle2" component="p" >{review.date}</Typography>
                                </Box>
                                <Divider sx={{p: 1}} />
                                </>
                            )
                        })}
                    </Box>
                </Box>

            </Grid>
            <Grid item lg={1} />
            <Grid item lg={4} >
                <Box sx={{ mt: 10, background: "white", p: 3, borderRadius: 3 }}>
                    <Typography variant='h2'>{productInfo?.name}</Typography>
                    <Stack spacing={3}>
                        <Typography variant="body2" >{productInfo?.category}</Typography>
                        <Typography fontWeight={500} >{productInfo?.description}</Typography>
                        <Typography variant='h5'>Price: {productInfo?.price} $</Typography>
                        <Typography variant='h6'>Count In Stock: {productInfo?.countInStock}</Typography>
                        <Typography >Brand: {productInfo?.brand}</Typography>
                        <Rating name="read-only" precision={0.5} value={productInfo?.rating} readOnly />
                        <Button variant="contained" size="large" endIcon={<ShoppingCart />}>Add to card</Button>
                        <Button variant="contained" size="large" color='secondary' endIcon={<FavoriteBorder />}>Add to wish list</Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Product