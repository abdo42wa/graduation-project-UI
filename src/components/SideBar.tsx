import { Checkroom, ElectricBolt, Handshake } from '@mui/icons-material'
import { List, ListItemText, Paper, ListSubheader, ListItemButton, ListItemIcon } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from "react"
import { getCategories } from '../reducers/categorySlice';

const SideBar = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const icons = [<Handshake />, <Checkroom />, <ElectricBolt />]

    return (
        <Paper elevation={3} >
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Categories
                    </ListSubheader>
                }
            >
                {categories.map((category, index) =>
                (
                    <ListItemButton key={category._id}>
                        <ListItemIcon>
                            {icons[index]}
                        </ListItemIcon>
                        <ListItemText primary={category.title} />
                    </ListItemButton>
                )
                )}
            </List>
        </Paper>
    )
}

export default SideBar