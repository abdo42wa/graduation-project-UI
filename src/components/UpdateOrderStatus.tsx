import { Button, Dialog, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { IOrderItems } from "../interfaces/IOrder";
import { updateSellerOrder } from "../reducers/orderSlice";
import { useAppDispatch } from "../store";

type OrderStatus = {
    open: boolean;
    onClose: (value: boolean) => void;
    productID: string,
    status: string,
}

const UpdateOrderStatus = (props: OrderStatus) => {
    const [status, setStatus] = useState("");
    const { onClose, open } = props;
    const dispatch = useAppDispatch();
    useEffect(() => {
        setStatus(props.status)
        console.log(props.status)

    }, [props.status])

    const handleClose = () => {
        onClose(false);
    };

    const handelApplyDiscount = () => {
        const postObj: IOrderItems = {
            status,
            _id: props.productID
        }
        dispatch(updateSellerOrder(postObj))
        console.log(postObj)

        onClose(true);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Update your product Visibility</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='row'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Published it?</InputLabel>
                                <Select
                                    value={status}
                                    labelId="demo-simple-select-label"
                                    label="Published it?"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value={'Preparing'}>Preparing</MenuItem>
                                    <MenuItem value={'Shipping'}>Shipping</MenuItem>
                                    <MenuItem value={'Ready'}>Ready</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Button sx={{ mt: 4, p: 1 }} variant="contained" size="large" fullWidth onClick={handelApplyDiscount}>Submit </Button>
                    </Box>
                </Box>
            </Dialog>

        </>
    )
}

export default UpdateOrderStatus