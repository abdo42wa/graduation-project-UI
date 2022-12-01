import { Card, Paper, Typography, CardContent, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../store";
import { formatCurrency } from "../utils/formatCurrency";

const ProductCart = () => {
    const { cart } = useAppSelector((state) => state.cart);
    return (
        <Paper elevation={3}>
            <Card>
                {cart.map((item) => {
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
                                        {formatCurrency(Number(item.price!)) + ` x ${item.quantity}`}
                                    </Typography>

                                </>
                            </Box>
                        </Box>
                    )
                })}
            </Card>
        </Paper>
    )
}

export default ProductCart