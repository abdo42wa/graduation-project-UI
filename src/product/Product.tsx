import { Button, Grid, Typography } from "@mui/material"
import products from "../data/ProductsData"
import { useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from "@mui/system";

const Product = () => {
    const location = useLocation();
    const productID = location.pathname.split('/')[2];
    const productInfo = products.find(product => product.id === Number(productID))
  return (
    <Grid container>
        <Grid item lg={3}>
        <Button href="/">GO back</Button>
            <Box  sx={{background: "white", mt:4, boxShadow: "5px 5px 15px 5px black", borderRadius:3,  p:'150px' }} >
            <img width={300}  alt={productInfo?.name} src={productInfo?.image} />
            </Box>
        </Grid>
    <Grid item lg={1} />
        <Grid item lg={4} >
           <Box  sx={{ mt:10, background: "white" , p:3, borderRadius:3}}>
           <Typography variant='h2'>{productInfo?.name}</Typography>
           <Typography >{productInfo?.category}</Typography>
           <Typography mt={3} mb={3} fontWeight={500} >Description: {productInfo?.description}</Typography>
           <Typography mb={3} variant='h5'>Price: {productInfo?.price} $</Typography>
           <Typography mb={3} variant='h6'>Count In Stock: {productInfo?.countInStock}</Typography>
           <Typography mb={4}>Brand: {productInfo?.brand}</Typography>
           <Button variant="contained" size="large" endIcon={<ShoppingCartIcon/>}>Add to card</Button>
           </Box>
        </Grid>
    </Grid>
  )
}

export default Product