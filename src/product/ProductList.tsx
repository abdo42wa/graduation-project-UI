import { useCallback, useEffect } from 'react'
import { Box, Grid, Button } from "@mui/material"
import { ProductCard } from "./ProductCard"
import SideBar from "../components/SideBar";
import HomePageHadar from "../components/HomePageHader";
import { useAppDispatch, useAppSelector } from "../store";
import { getLatestProducts, getProducts } from '../reducers/productSlice';
import { useNavigate } from 'react-router-dom';

export const ProductList = () => {
  const { products, isLodging } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch();
  const history = useNavigate();

  const initApp = useCallback(async () => {
    await dispatch(getLatestProducts())
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
      <Grid container spacing={4} p={8} >
        {isLodging ? (
          <h1>Lodging...</h1>
        ) :

          <>
            <Grid item lg={12} justifyContent='center' display='flex' >
              <h1>Latest Products</h1>
            </Grid>
            {products.map((product) => (

              <ProductCard isPublished={product.isPublished!} isOwner={false} _id={product._id} discount={product.discount!} name={product.name} image={product.image} price={product.price!} key={product._id} />
            ))}
            <Grid item lg={12} justifyContent='center' display='flex' >
              <Button sx={{ justifyContent: 'center', p: [2] }} onClick={() => history('/products')} variant='outlined' >See All</Button>
            </Grid>
          </>

        }

      </Grid>
    </Box>
  )
}
