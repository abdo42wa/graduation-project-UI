import { useCallback, useEffect } from 'react'
import { Box, Grid } from "@mui/material"
import { ProductCard } from "./ProductCard"
import SideBar from "../components/SideBar";
import HomePageHadar from "../components/HomePageHader";
import { useAppDispatch, useAppSelector } from "../store";
import { getProducts } from '../reducers/productSlice';
import { formatCurrency } from '../utils/formatCurrency';

export const ProductList = () => {
  const { products, isLodging } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  return (
    <Box sx={{ width: '100%', flexGrow: '1' }}>
      <Grid container spacing={4} p={10} >
        <Grid item lg={4} >
          <Box>
            <SideBar />
          </Box>
        </Grid>
        <Grid item lg={8} >
          <Grid container>
            <HomePageHadar />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4} p={10} >
        {isLodging ? (
          <h1>Lodging...</h1>
        ) :

          products.map((product) => (
            <ProductCard _id={product._id} name={product.name} image={product.image} price={Number(formatCurrency(product.price!))} key={product._id} />
          ))

        }

      </Grid>
    </Box>
  )
}
