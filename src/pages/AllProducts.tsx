import { Box, Grid } from "@mui/material"
import { useCallback, useEffect } from 'react'
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { ProductCard } from "../product/ProductCard";
import { getProducts, getSearchedProduct } from '../reducers/productSlice';
import { useAppDispatch, useAppSelector } from "../store";

const AllProducts = () => {
    const { search, id } = useParams();

    const { products, isLodging } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();

    const initApp = useCallback(async () => {
        if (!id)
            await dispatch(getProducts(''))

    }, [useAppDispatch])

    useEffect(() => {
        if (!search) {

            initApp()
        }
    }, [initApp, search, id])

    useEffect(() => {

        dispatch(getSearchedProduct(search!))
    }, [dispatch, search])

    useEffect(() => {
        if (!search)
            dispatch(getProducts(id!))
    }, [dispatch, id])

    return (
        <Box sx={{ width: '100%', flexGrow: '1' }}>
            <Grid container spacing={4} p={10} >
                <Grid item lg={4} >
                    <Box>
                        <SideBar />
                    </Box>
                </Grid>

            </Grid>
            <Grid container spacing={4} p={10} >
                {isLodging ? (
                    <h1>Lodging...</h1>
                ) :

                    <>

                        {products.map((product) => (

                            <ProductCard isPublished={product.isPublished!} isOwner={false} _id={product._id} discount={product.discount!} name={product.name} image={product.image} price={product.price!} key={product._id} />
                        ))}
                    </>

                }

            </Grid>
        </Box>
    )
}

export default AllProducts