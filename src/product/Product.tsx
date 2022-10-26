import { Button, Grid, ImageList, ImageListItem, Typography } from "@mui/material"
import products from "../data/ProductsData"
import { useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Stack } from "@mui/system";

const Product = () => {
    const location = useLocation();
    const productID = location.pathname.split('/')[2];
    const productInfo = products.find(product => product.id === Number(productID))
  return (
    <Grid container justifyContent='center'>
        <Grid item lg={3}>
        <Button variant="outlined" href="/">GO back</Button>
            <Box  sx={{background: "white", mt:4, boxShadow: "5px 5px 15px 5px black", borderRadius:3,  p:'150px', height:'250px' }} >
                <img width={300} loading="lazy" alt={productInfo?.name} src={productInfo?.image} />
            </Box>
        </Grid>
    <Grid item lg={1} />
        <Grid item lg={4} >
           <Box  sx={{ mt:10, background: "white" , p:3, borderRadius:3}}>
            <Stack spacing={3}>
           <Typography variant='h2'>{productInfo?.name}</Typography>
           <Typography >{productInfo?.category}</Typography>
           <Typography  fontWeight={500} >Description: {productInfo?.description}</Typography>
           <Typography  variant='h5'>Price: {productInfo?.price} $</Typography>
           <Typography  variant='h6'>Count In Stock: {productInfo?.countInStock}</Typography>
           <Typography >Brand: {productInfo?.brand}</Typography>
           <Button variant="contained" size="large" endIcon={<ShoppingCartIcon/>}>Add to card</Button>
            </Stack>
           </Box>
        </Grid>
    </Grid>
  )
}

export default Product