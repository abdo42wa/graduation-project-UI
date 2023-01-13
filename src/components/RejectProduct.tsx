import { Button, Dialog, DialogTitle, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { io } from "socket.io-client";
import { ICreateProduct } from "../product/ProductType";
import { rejectProduct } from "../reducers/productSlice";
import { useAppDispatch } from "../store";

type RejectProductProps = {
    open: boolean;
    onClose: (value: boolean) => void;
    productID: string,
    userID: { name: string, _id: string } | string,
    productName: string,
}

const RejectProduct = (props: RejectProductProps) => {
    const [message, setMessage] = useState<string | undefined>('');
    const { onClose, open } = props;
    const dispatch = useAppDispatch();


    const handleClose = () => {
        onClose(false);
    };

    const handelMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const handelSubmit = () => {

        const socket = io("http://localhost:5000");
        socket.emit("sendNotification", {
            productID: props.productID,
            message: `Your product ${props.productName} got Rejected`,
            receiverId: props.userID,
            reded: false,
        });

        console.log({ props })
        const postObj: ICreateProduct = {
            rejectedMessage: message,
            _id: props.productID
        }
        dispatch(rejectProduct(postObj))

        onClose(true);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Reject Product</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='row'>
                            <Typography p={2} variant="subtitle1" component="span" >Enter a Message :</Typography>
                            <TextField id="standard-basic" label="Message" variant="standard" value={message} onChange={handelMessage} />
                        </Stack>
                        <Button sx={{ mt: 1, p: 1 }} variant="contained" size="large" fullWidth onClick={handelSubmit}>Submit </Button>
                    </Box>
                </Box>
            </Dialog>

        </>
    )
}

export default RejectProduct
