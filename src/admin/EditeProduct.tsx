import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { ICreateProduct, ProductStatus } from "../product/ProductType"
import { getCategories } from "../reducers/categorySlice"
import { getProductByID, updateProduct } from "../reducers/productSlice"
import { useAppDispatch, useAppSelector } from "../store"



const EditProduct = () => {

    const [status, setStatus] = useState(ProductStatus.NEW)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [discount, setDiscount] = useState(0)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [isPublished, setIsPublished] = useState(false)

    const dispatch = useAppDispatch();
    const history = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { categories } = useAppSelector(state => state.category)
    const { singleProduct } = useAppSelector(state => state.products)

    const location = useLocation();

    const productID = location.pathname.split('/')[3];

    useEffect(() => {
        if (user && !user?.isAdmin && user?.type !== "SELLER") {
            history('/')
        }
        dispatch(getProductByID(productID))
        dispatch(getCategories())

        setName(singleProduct?.name!)
        setBrand(singleProduct?.brand!)
        setCategory(singleProduct?.category?._id!)
        setCountInStock(singleProduct?.countInStock!)
        setDescription(singleProduct?.description!)
        setDiscount(singleProduct?.discount!)
        setPrice(singleProduct?.price!)
        setImage(singleProduct?.image!)
        setIsPublished(singleProduct?.isPublished!)
        setStatus(singleProduct?.status!)

    }, [dispatch, user, history, productID, singleProduct])

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as ProductStatus);
    };
    const postObj: ICreateProduct = {
        _id: productID,
        name,
        category,
        image,
        brand,
        discount,
        description,
        price,
        status,
        countInStock,
        isPublished
    }
    const initialValue = {
        _id: productID,
        name: singleProduct?.name,
        category: singleProduct?.category?._id,
        image: singleProduct?.image,
        brand: singleProduct?.brand,
        discount: singleProduct?.discount,
        description: singleProduct?.description,
        price: singleProduct?.price,
        status: singleProduct?.status,
        countInStock: singleProduct?.countInStock,
        isPublished: singleProduct?.isPublished
    }
    const handelSubmit = () => {
        dispatch(updateProduct(postObj))

    }

    return (
        <Grid container justifyContent="center" display='flex' mt={5}>
            <Paper elevation={3} sx={{ padding: '30px' }}>
                <Box>
                    <Typography variant="h2" my={5} display="block" component="h1">Edit Product</Typography>
                    <Stack direction="row" spacing={2} mb={2} >
                        <TextField fullWidth label="Name" name='name' type='text' variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"> Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={handleChange}
                            >
                                <MenuItem value={ProductStatus.NEW}>New</MenuItem>
                                <MenuItem value={ProductStatus.USED}>Used</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Published it?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={isPublished}
                                label="Published it?"
                                onChange={(e) => setIsPublished(Boolean(e.target.value))}
                            >
                                <MenuItem value={'true'}>Yes</MenuItem>
                                <MenuItem value={'false'}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2}>
                        <TextField fullWidth label="Price" name='price' type='text' value={price} variant="outlined" onChange={(e) => setPrice(Number(e.target.value))} InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }} />
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"> Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((category) => {
                                    return (
                                        <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <TextField fullWidth label="Image Link" type='text' value={image} variant="outlined" onChange={(e) => setImage(e.target.value)} />
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <TextField fullWidth label="Brand" type='text' variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <TextField fullWidth minRows={3} label="Description" variant="outlined" multiline name='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <TextField fullWidth label="Discount" type='text' value={discount} variant="outlined" onChange={(e) => setDiscount(Number(e.target.value))} />
                    </Stack>
                    <Stack direction="row" spacing={2} mb={2} >
                        <TextField fullWidth label="Count In Stock" type='text' variant="outlined" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} />
                    </Stack>
                    <Button disabled={JSON.stringify(postObj) === JSON.stringify(initialValue)} fullWidth variant="contained" onClick={handelSubmit}>Save</Button>
                </Box>
            </Paper>
        </Grid>
    )
}

export default EditProduct