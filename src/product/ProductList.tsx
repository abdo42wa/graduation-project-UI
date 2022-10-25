import { Grid } from "@mui/material"
import products from "../data/ProductsData"
import { ProductCard } from "./ProductCard"

export const ProductList = () => {
  return(

       <Grid container>
       { products.map((product) =>(
            <ProductCard id={product.id} name={product.name} image={product.image} price={product.price} key={product.id} />
            ))}
       </Grid>
  )
}
