import { Add, AddBox, Class, Comment, EditOff, ProductionQuantityLimits, SupervisedUserCircle, Widgets } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'

const AdminDaxhborde = () => {
    return (

        <Grid container p={10} spacing={4}>
            <Grid item md={2}>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'white' }}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton href='/create/product'>
                                    <ListItemIcon>
                                        <Add />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Product" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton href='/create/category'>
                                    <ListItemIcon>
                                        <AddBox />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Category" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EditOff />
                                    </ListItemIcon>
                                    <ListItemText primary="Manage products" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </Grid>
            <Grid item>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Users
                        </Typography>
                        <SupervisedUserCircle sx={{ fontSize: "50px", color: 'green' }} />
                        <Typography variant="h5" component="div">
                            50
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">See All</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Products
                        </Typography>
                        <Widgets sx={{ fontSize: "50px", color: 'red' }} />
                        <Typography variant="h5" component="div">
                            50
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small">See All</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Categories
                        </Typography>
                        <Class sx={{ fontSize: "50px", color: 'yellow' }} />
                        <Typography variant="h5" component="div">
                            50
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small">See All</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Orders
                        </Typography>
                        <ProductionQuantityLimits sx={{ fontSize: "50px", color: 'blue' }} />
                        <Typography variant="h5" component="div">
                            50
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small">See All</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Reviews
                        </Typography>
                        <Comment sx={{ fontSize: "50px", color: 'burlywood' }} />
                        <Typography variant="h5" component="div">
                            500
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small">See All</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default AdminDaxhborde