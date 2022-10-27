import { Box, Grid } from "@mui/material"
import products from "../data/ProductsData"
import { ProductCard } from "./ProductCard"

export const ProductList = () => {
  return(
    <Box ml={30}>
       <Grid container spacing={4}  mt={3}>
       { products.map((product) =>(
           <ProductCard id={product.id} name={product.name} image={product.image} price={product.price} key={product.id} rating={product.rating} />
           ))}
       </Grid>
    </Box>
  )
}
