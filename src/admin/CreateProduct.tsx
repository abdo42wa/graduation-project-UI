import { PhotoCamera } from "@mui/icons-material"
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ICreateProduct, ProductStatus } from "../product/ProductType"
import { getCategories } from "../reducers/categorySlice"
import { createProduct } from "../reducers/productSlice"
import { useAppDispatch, useAppSelector } from "../store"



const CreateProduct = () => {

    const [status, setStatus] = useState(ProductStatus.NEW)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [imageCloud, setImageCloud] = useState('')
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

    useEffect(() => {
        if (user && !user?.isAdmin && user?.type !== "SELLER") {
            history('/')
        }

        dispatch(getCategories())
    }, [dispatch, user, history])

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as ProductStatus);
    };

    const handleUploadImageChange = (e: any) => {
        transformFile(e.target.files[0])
    };

    const transformFile = (file: Blob) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageCloud(reader.result as string);
            }
        } else {
            setImageCloud("");
        }
    }

    const handelSubmit = () => {
        const postObj: ICreateProduct = {
            name,
            category,
            image: imageCloud,
            brand,
            discount,
            description,
            price,
            status,
            countInStock,
            isPublished,
        }
        if (image.length < 5063) {
            toast.warning("Image size it to large")
        } else {

            dispatch(createProduct(postObj))
            setImageCloud("");
            setName("");
            setBrand("");
            setDescription("");
            setPrice(0);
            setDiscount(0);
            setCountInStock(0);
        }

    }
    return (
        <Grid container justifyContent="center" display='flex' mt={5}>
            <Paper elevation={3} sx={{ padding: '30px' }}>
                <Box>
                    <Typography variant="h2" my={5} display="block" component="h1">Create Product</Typography>
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
                        <Button variant="contained" component="label" onChange={(e) => handleUploadImageChange(e)}>
                            Upload
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
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
                    <Button fullWidth variant="contained" onClick={handelSubmit}>Create</Button>
                </Box>

            </Paper>
        </Grid>
    )
}

export default CreateProduct