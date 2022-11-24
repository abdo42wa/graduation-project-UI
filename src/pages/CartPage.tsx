import { Add, Remove } from "@mui/icons-material";
import { Card, Divider, Grid, Paper, Typography, CardContent, CardMedia, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { IProduct } from "../product/ProductType";
import { decrementProduct, incrementProduct } from "../reducers/cartSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { formatCurrency } from "../utils/formatCurrency";
export interface ICartItem {

    children?: JSX.Element | JSX.Element[];
}

const CartPage = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const totalQty = cart.reduce((acc: any, item: any) => acc + item.quantity, 0);
    const totalPrice = cart.reduce(
        (acc: any, item: any) => acc + item.quantity * item.price,
        0
    );

    const handleRemoveFromCartByOne = (item: IProduct) => {
        dispatch(decrementProduct(item!))

    };

    const handleAddToCartByOne = (item: IProduct) => {
        dispatch(incrementProduct(item!))
    };

    return (
        <Grid container display="flex" justifyContent="center" pt={8} spacing={4}>
            <Typography variant='h5' component='h1'>
                Cart Items {totalQty}
            </Typography>
            <Grid item md={6}>
                <Paper elevation={3}>
                    <Card>
                        {cart.map((item) => {
                            const productInCart = cart.find((x) => x._id === item._id);
                            return (
                                <Box key={item._id}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={3}>
                                        <Box sx={{ display: "flex", width: "60%" }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ maxWidth: '200px' }}
                                                image={item.image}
                                                alt="Live from space album cover"
                                            />
                                            <CardContent>
                                                <Typography variant='subtitle2' component='span'>
                                                    {item.description}
                                                </Typography>


                                            </CardContent>
                                        </Box>
                                        <>
                                            <Typography variant='subtitle2' fontSize="18px" component='span' mr={4}>
                                                {formatCurrency(item.price!)}
                                            </Typography>
                                            <>
                                                <IconButton onClick={() => handleRemoveFromCartByOne(item)} >
                                                    <Remove />
                                                </IconButton>
                                                {productInCart?.quantity}
                                                <IconButton
                                                    disabled={productInCart?.quantity ? productInCart?.quantity >= item?.countInStock! : false}
                                                    onClick={() => handleAddToCartByOne(item)} >
                                                    <Add />
                                                </IconButton>
                                            </>

                                        </>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Card>
                </Paper>
            </Grid>
            <Grid item md={4}>
                <Paper>
                    <Card>
                        <CardContent>
                            <Typography variant='subtitle2' fontSize="18px" component='p' mr={4}>
                                Items :    {totalQty}
                            </Typography>
                            <Typography variant='subtitle2' fontSize="18px" component='p' mr={4}>
                                Total :    {formatCurrency(totalPrice)}
                            </Typography>
                            <Divider />
                            <Button sx={{ mt: 5 }} fullWidth variant="contained">Check out</Button>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid >
    );
};

export default CartPage;