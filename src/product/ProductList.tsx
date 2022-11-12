import { useCallback, useEffect } from 'react'
import { Box, Grid } from "@mui/material"
//import products from "../data/ProductsData"
import { ProductCard } from "./ProductCard"
import SideBar from "../components/SideBar";
import HomePageHader from "../components/HomePageHader";
import { useAppSelector } from "../store";

export const ProductList = () => {
  const { products, isLoding } = useAppSelector(state => state.products)


  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={4} p={10} >
        <Grid item lg={4} >
          <Box>
            <SideBar />
          </Box>
        </Grid>
        <Grid item lg={8} >
          <Grid container>
            <HomePageHader />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4} p={10} >
        {isLoding ? (
          <h1>Loding</h1>
        ) :

          products.map((product) => (
            <ProductCard id={product.id} name={product.name} image={product.image} price={product.price} key={product.id} />
          ))

        }

      </Grid>
    </Box>
  )
}
