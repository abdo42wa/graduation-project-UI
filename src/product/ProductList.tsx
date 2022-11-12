import { useCallback, useEffect } from 'react'
import { Box, Grid } from "@mui/material"
import { ProductCard } from "./ProductCard"
import SideBar from "../components/SideBar";
import HomePageHader from "../components/HomePageHader";
import { useAppDispatch, useAppSelector } from "../store";
import { getProducts } from '../reducers/productSlice';

export const ProductList = () => {
  const { products, isLoding } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

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
          <h1>Loding...</h1>
        ) :

          products.map((product) => (
            <ProductCard _id={product._id} name={product.name} image={product.image} price={product.price} key={product._id} />
          ))

        }

      </Grid>
    </Box>
  )
}
