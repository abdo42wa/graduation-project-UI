import { Apps, HourglassTop, Add } from '@mui/icons-material'
import { List, ListItemText, Paper, ListItemButton, ListItemIcon } from '@mui/material'

const Menu = () => {
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