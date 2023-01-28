import { useEffect, useMemo, useState } from 'react'
import { Add, AddBox, Class, Comment, EditOff, HourglassTop, ProductionQuantityLimits, SupervisedUserCircle, Widgets } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../store'
import { useNavigate } from 'react-router-dom'
import Chart from '../components/Chart'
import { getAllUsers, getUserStatsAdmin } from '../reducers/userSlice'
import { getAllOrders, getIncomeStatsAdmin } from '../reducers/orderSlice'
import { getAllProduct, getProductStatsAdmin } from '../reducers/productSlice'
import { getAllReviews, getReviewStatsAdmin } from '../reducers/reviewSlice'

const AdminDashboard = () => {
    const dispatch = useAppDispatch();
    const history = useNavigate();
    const { currentUsername, users, data } = useAppSelector(state => state.user)
    const { orderData, orders } = useAppSelector(state => state.order)
    const { productData, products } = useAppSelector(state => state.products)
    const { reviewData, reviews } = useAppSelector(state => state.reviews)
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        if (!currentUsername) {
            history('/login')
        }
        dispatch(getUserStatsAdmin());
        dispatch(getIncomeStatsAdmin());
        dispatch(getProductStatsAdmin());
        dispatch(getReviewStatsAdmin());
        dispatch(getAllUsers());
        dispatch(getAllReviews());
        dispatch(getAllProduct());
        dispatch(getAllOrders());
    }, [history, currentUsername, MONTHS])


    return (

        <>
            <Grid container p={10} spacing={4}>
                <Grid item md={2}>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'white', height: '100%' }}>
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
                                <ListItem disablePadding>
                                    <ListItemButton href='/admin/approve'>
                                        <ListItemIcon>
                                            <HourglassTop />
                                        </ListItemIcon>
                                        <ListItemText primary="pending Approve" />
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
                                {users.length}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button href='/admin/users' size="small">See All</Button>
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
                                {products.length}
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button href='/admin/products' size="small">See All</Button>
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
                                3
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
                                {orders.length}
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button href='/admin/orders' size="small">See All</Button>
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
                                {reviews.length}
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button href='/admin/reviews' size="small">See All</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={6} >

                    <Chart data={data.map((x: any) => {
                        return { name: MONTHS[x._id - 1], "Active User": x.total }
                    })}
                        title="User Analytics"
                        grid
                        dataKey="Active User" />
                </Grid>

                <Grid item md={6} >

                    <Chart data={orderData.map((x: any) => {
                        return { name: MONTHS[x._id - 1], "Income": x.total }
                    })}
                        title="Income Analytics"
                        grid
                        dataKey="Income" />
                </Grid>

                <Grid item md={6} >

                    <Chart data={productData.map((x: any) => {
                        return { name: MONTHS[x._id - 1], "Products": x.total }
                    })}
                        title="Products Analytics"
                        grid
                        dataKey="Products" />
                </Grid>
                <Grid item md={6} >

                    <Chart data={reviewData.map((x: any) => {
                        return { name: MONTHS[x._id - 1], "Reviews": x.total }
                    })}
                        title="Reviews Analytics"
                        grid
                        dataKey="Reviews" />
                </Grid>
            </Grid>



        </>
    )
}

export default AdminDashboard