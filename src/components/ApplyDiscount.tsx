import { Button, Dialog, DialogTitle, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { ICreateProduct } from "../product/ProductType";
import { applyDiscount } from "../reducers/productSlice";
import { useAppDispatch } from "../store";

type ProductDiscount = {
    open: boolean;
    onClose: (value: boolean) => void;
    productID: string,
    price: number,
    discount: number
}

const ApplyDiscount = (props: ProductDiscount) => {
    const [discount, setDiscount] = useState<number | undefined>(0);
    const { onClose, open } = props;
    const dispatch = useAppDispatch();
    useEffect(() => {
        setDiscount(props.discount)

    }, [props.discount])

    const handleClose = () => {
        onClose(false);
    };

    const handelDiscount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDiscount(Number(e.target.value));
    }

    const handelApplyDiscount = () => {
        const postObj: ICreateProduct = {
            discount,
            _id: props.productID
        }
        dispatch(applyDiscount(postObj))

        onClose(true);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Apply Discount</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='row'>
                            {/* price - (price * discount / 100) */}
                            <Typography p={2} variant="subtitle1" component="span" >Your product price : {discount !== 0 ? props.price - (Number(props.price) * discount!) / 100 : props.price}</Typography>

                        </Stack>
                    </Box>

                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >enter a discount :</Typography>
                            <TextField id="standard-basic" label="Discount" variant="standard" value={discount} onChange={handelDiscount} />
                        </Stack>
                        <Button sx={{ mt: 1, p: 1 }} variant="contained" size="large" fullWidth onClick={handelApplyDiscount}>Submit </Button>
                    </Box>
                </Box>
            </Dialog>

        </>
    )
}

export default ApplyDiscount