import { Button, CardContent, Divider, Grid, Rating, TextField, Typography, Card, CardMedia, Dialog, DialogTitle, Checkbox } from "@mui/material"
import products from "../data/ProductsData"
import { useLocation } from 'react-router-dom';
import { ShoppingCart, FavoriteBorder, Bookmark, Favorite } from '@mui/icons-material';
import { Box, Stack } from "@mui/system";
import { useState } from "react";

type Review = {
    author: string;
    body: string;
    date: string;
    rating: string
}

type ProductReviews = {
    open: boolean;
    onClose: (value: boolean) => void;
}

const ReviewFoem = (props: ProductReviews) => {
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [review, setReview] = useState<string>("");
    const [, setReviews] = useState<Review[]>(fakeReviews);
    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };

    const handelRating = (e: React.ChangeEvent<{}>, newValue: number | null) => {
        setRatingValue(newValue);
    }
    const handelchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }
    const addReview = () => {

        setReviews(prevReview => [
            ...prevReview,
            { author: "Abdo Lukas", body: review, date: "2022-11-15", rating: "5" }
        ])
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >Rate the product :</Typography>
                            <Rating sx={{ p: 2, mt: 0.2 }} precision={0.5} value={ratingValue} onChange={handelRating} />
                        </Stack>
                    </Box>

                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >Leave a review :</Typography>
                            <TextField id="standard-basic" label="review" variant="standard" value={review} onChange={handelchange} />
                        </Stack>
                        <Button sx={{ mt: 1, p: 1 }} variant="contained" size="large" fullWidth onClick={addReview}>Submit </Button>
                    </Box>
                </Box>
            </Dialog>

        </>
    )
}

const fakeReviews = [
    {
        author: "Abdo Ahmed",
        body: "this is bad product",
        rating: "5",
        date: "2022-11-05"
    },
    {
        author: "Lukas Song",
        body: "fake review",
        rating: " 4.5",
        date: "2022-11-25"
    },
    {
        author: "Pavlo Pidluzny",
        body: "this is fake good product",
        rating: "3.5",
        date: "2022-11-15"
    }
]

const Product = () => {
    const location = useLocation();
    const [reviews,] = useState<Review[]>(fakeReviews);
    const [openReviewForm, setOpenReviewForm] = useState(false);
    const [checked, setChecked] = useState(false);
    const productID = location.pathname.split('/')[2];
    const productInfo = products.find(product => product.id === productID)

    const handleClickOpen = () => {
        setOpenReviewForm(true);
    };
    const handleClose = () => {
        setOpenReviewForm(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        console.log(checked)
    };
    return (
        <Grid container display="flex" justifyContent='center' mt={5}>
            <Grid item lg={4}>
                <Button variant="outlined" href="/">GO back</Button>
                <Box sx={{ background: "white", mt: 4, boxShadow: "5px 5px 15px 5px black", borderRadius: 3, p: '150px', height: ["400px"], display: 'flex', justifyContent: 'center' }} >
                    <img max-width={300} loading="lazy" alt={productInfo?.name} src={productInfo?.image} />
                </Box>

            </Grid>
            <Grid item lg={1} />
            <Grid item lg={5} >
                <Box sx={{ mt: 10, background: "white", p: 3, borderRadius: 3 }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant='h2' fontSize="2rem">{productInfo?.name}</Typography>
                        <Checkbox onChange={handleChange} checked={checked} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red" }} />} />
                    </Box>
                    <Stack spacing={3}>
                        {/* <Typography variant="body2" >{productInfo?.category}</Typography> */}
                        <Box display="flex" justifyContent='start' pt={2}>
                            <Rating name="read-only" precision={0.5} value={productInfo?.rating} readOnly /> <Typography component="span" sx={{ ml: 2 }}>{productInfo?.rating}</Typography>
                        </Box>
                        <Typography fontWeight={500} >{productInfo?.description}</Typography>

                        <Typography variant='h6'>Count In Stock: {productInfo?.countInStock}</Typography>
                        <Typography >Brand: {productInfo?.brand}</Typography>

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
                                        Saler name
                                    </Typography>

                                </CardContent>
                            </Box>
                        </Card>
                    </Box>
                </Box>
                {/* Add to card part */}
                <Box sx={{ mt: 5, background: "white", p: 3, borderRadius: 3 }}>
                    <Box sx={{ background: "rgba(34, 34, 34, 0.04)", borderRadius: 3, p: 3 }} display="flex" flexDirection="row" justifyContent="space-between">
                        <Typography variant='h5'>Price: {productInfo?.price} $</Typography>
                        <Button variant="contained" size="large" sx={{ borderRadius: 4, bgcolor: "#00CD66" }} endIcon={<ShoppingCart />}>Add to card</Button>
                    </Box>
                </Box>
                {/* reviews part */}
                <Box sx={{ mt: 5, background: "white", p: 3, borderRadius: 3 }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant='h6' fontWeight="bold" p={2}>Reviews</Typography>
                        <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={handleClickOpen}>Write a review</Button>
                        <ReviewFoem open={openReviewForm} onClose={handleClose} />
                    </Box>
                    <Box>
                        {reviews.map((review) => {
                            return (
                                <>
                                    <Box >
                                        <Box display="flex" justifyContent='start' pt={2}>
                                            <Typography component="span" sx={{ mx: 2 }}>{review?.author}</Typography> |
                                            <Rating name="read-only" precision={0.5} value={6} readOnly sx={{ mx: 2 }} />
                                        </Box>
                                        <Typography p={2} variant="subtitle1" component="span" >{review.body}</Typography>
                                        <Typography ml={2} color='gray' variant="subtitle2" component="p" >{review.date}</Typography>
                                    </Box>
                                    <Divider sx={{ p: 1 }} />
                                </>
                            )
                        })}
                    </Box>
                </Box>

            </Grid >
        </Grid >
    )
}

export default Product