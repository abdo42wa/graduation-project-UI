import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { ICategory } from "../interfaces/ICategory"
import { createCategory, getCategories } from "../reducers/categorySlice"
import { useAppDispatch, useAppSelector } from "../store"



const CreateCategory = () => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')

    const dispatch = useAppDispatch();
    const history = useNavigate()
    // const { user } = useAppSelector(state => state.user)
    const { categories } = useAppSelector(state => state.category)

    useEffect(() => {
        //     if (user?.isAdmin == false) {

        //         history('/')
        //     }

        dispatch(getCategories())
    }, [dispatch])


    const handelCreateCategory = () => {
        const postObj: ICategory = {
            title
        }
        console.log({ postObj })
        dispatch(createCategory(postObj))
    }
    return (
        <>
            <Grid container justifyContent="center" display='flex' mt={5}>
                <Paper elevation={3} sx={{ padding: '30px' }}>
                    <Box>
                        <Typography variant="h2" my={5} display="block" component="h1">Create Category</Typography>
                        <Stack direction="row" spacing={2} mb={2} >
                            <TextField fullWidth label="Category" type='text' value={title} variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                        </Stack>
                        <Button fullWidth variant="contained" onClick={handelCreateCategory}>Create</Button>
                    </Box>
                </Paper>
            </Grid>

            <Grid container justifyContent="center" display='flex' mt={5}>
                <Paper elevation={3} sx={{ padding: '30px' }}>
                    <Box>
                        <Typography variant="h2" my={5} display="block" component="h1">Create Sub-Category</Typography>
                        < Stack direction="row" spacing={2} mb={2} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Parent category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Parent category"
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
                            <TextField fullWidth label="sub-category" type='text' value={title} variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                        </Stack>
                        <Button fullWidth variant="contained" onClick={handelCreateCategory}>Create</Button>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}

export default CreateCategory