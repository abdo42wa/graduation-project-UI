import { IOrder } from '../interfaces/IOrder';
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

type CartProps = {
    id?: string,
    open: boolean;
    onClose: (value: boolean) => void;
}
const OrderDetails = (props: Pick<IOrder & CartProps, 'id' | 'paymentMethod' | 'shippingAddress' | 'orderItems' | 'onClose' | 'open'>) => {

    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };
    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Order Details</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='column'>
                            <Typography p={2} variant="subtitle1" component="span" >Address</Typography>
                            <p>Address: {props.shippingAddress?.address}</p>
                            <p>City: {props.shippingAddress?.city}</p>
                            <p>Country: {props.shippingAddress?.country}</p>
                            <p>Postal Code: {props.shippingAddress?.postalCode}</p>
                        </Stack>
                        <>


                            <Typography p={2} variant="subtitle1" component="span" >Order items </Typography>
                            {props.orderItems?.map((x) => (
                                <Box key={x._id}>
                                    <p>{x.name}</p>
                                    <img width='250 px' height='250 px' src={x.image} alt={x.name} />
                                    <p>{x.price}</p>
                                </Box>


                            ))}
                        </>
                    </Box>

                    <Box>

                        <Button sx={{ mt: 1, p: 1 }} variant="contained" size="large" fullWidth onClick={handleClose}>Close </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default OrderDetails