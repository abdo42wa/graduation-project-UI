import { Button, Dialog, DialogTitle, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { getUserAddressById } from "../reducers/shippingAddressSlice";
import { useAppDispatch, useAppSelector } from "../store";

type AddressProps = {
    open: boolean;
    onClose: (value: boolean) => void;
    userID: string,
}

const AddressPopUp = (props: AddressProps) => {
    const { onClose, open } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserAddressById(props.userID))

    }, [props.userID, dispatch])
    dispatch(getUserAddressById(props.userID))

    const { shippingAddress } = useAppSelector(state => state.shipping)

    const handleClose = () => {
        onClose(false);
    };




    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>User address</DialogTitle>
                    {!shippingAddress ? (
                        <h1>Loading...</h1>
                    ) : (
                        <Box>
                            <Stack spacing={3} direction='row'>
                                <Typography>Address : {shippingAddress?.address}</Typography>
                                <Typography>City : {shippingAddress?.city}</Typography>
                                <Typography>Country : {shippingAddress?.country}</Typography>
                                <Typography>Post Code : {shippingAddress?.postalCode}</Typography>

                            </Stack>
                        </Box>
                    )

                    }

                </Box>
            </Dialog>

        </>
    )
}


export default AddressPopUp