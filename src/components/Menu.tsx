import { Apps, ElectricBolt, HourglassTop, Add } from '@mui/icons-material'
import { List, ListItemText, Paper, ListSubheader, ListItemButton, ListItemIcon } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from "react"
import { getCategories } from '../reducers/categorySlice';

const Menu = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (
        <Paper  >
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                <ListItemButton href='/create/product'>
                    <ListItemIcon >
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="create product" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <HourglassTop />
                    </ListItemIcon>
                    <ListItemText primary="pending Approve" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <Apps />
                    </ListItemIcon>
                    <ListItemText primary="All Products" />
                </ListItemButton>
            </List>
        </Paper>
    )
}

export default Menu