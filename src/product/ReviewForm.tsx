import { Button, Dialog, DialogTitle, Rating, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IReview } from "../interfaces/Ireview";
import { createProductReview } from "../reducers/reviewSlice";
import { useAppDispatch, useAppSelector } from "../store";

type ProductReviews = {
    open: boolean;
    onClose: (value: boolean) => void;
    productID: string
}
const ReviewForm = (props: ProductReviews) => {
    const [rating, setRatingValue] = useState<number | null>(0);
    const [comment, setReview] = useState<string>("");
    const { onClose, open } = props;
    const dispatch = useAppDispatch();
    const { currentUsername } = useAppSelector(state => state.user)
    const history = useNavigate();

    useEffect(() => {
        if (!currentUsername) {
            history('/login')

        }
    }, [currentUsername, history])

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
        const postObj: IReview = {
            comment,
            rating,
            _id: props.productID
        }
        dispatch(createProductReview(postObj))
        setRatingValue(0);
        setReview('')
        onClose(true);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >Rate the product :</Typography>
                            <Rating sx={{ p: 2, mt: 0.2 }} precision={0.5} value={rating} onChange={handelRating} />
                        </Stack>
                    </Box>

                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >Leave a review :</Typography>
                            <TextField id="standard-basic" label="review" variant="standard" value={comment} onChange={handelchange} />
                        </Stack>
                        <Button sx={{ mt: 1, p: 1 }} variant="contained" size="large" fullWidth onClick={addReview}>Submit </Button>
                    </Box>
                </Box>
            </Dialog>

        </>
    )
}

export default ReviewForm