import { Apps, HourglassTop, Add, BusinessCenter, ErrorOutline, } from '@mui/icons-material'
import { List, ListItemText, Paper, ListItemButton, ListItemIcon } from '@mui/material'

const Menu = () => {
    return (
        <Paper sx={{ height: '100vh' }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                <ListItemButton href='/create/product'>
                    <ListItemIcon >
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="create product" />
                </ListItemButton>
                <ListItemButton href='/shop/pending'>
                    <ListItemIcon>
                        <HourglassTop />
                    </ListItemIcon>
                    <ListItemText primary="pending Approve" />
                </ListItemButton>
                <ListItemButton href='/shop/rejected'>
                    <ListItemIcon>
                        <ErrorOutline />
                    </ListItemIcon>
                    <ListItemText primary="Rejected products" />
                </ListItemButton>
                <ListItemButton href='/shop'>
                    <ListItemIcon>
                        <Apps />
                    </ListItemIcon>
                    <ListItemText primary="All products" />
                </ListItemButton>
                <ListItemButton href='/orders/shop' >
                    <ListItemIcon>
                        <BusinessCenter />
                    </ListItemIcon>
                    <ListItemText primary="My Orders" />
                </ListItemButton>
            </List>
        </Paper>
    )
}

export default Menu