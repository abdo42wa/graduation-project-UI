import { useState, useEffect } from 'react';
import { Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import { getAllUserOrders } from '../reducers/orderSlice';
import Spinner from '../components/Spinner';
import OrderDetails from '../components/OrderDetails';

const Orders = () => {

    const history = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { orders, isLodging } = useAppSelector(state => state.order)
    const dispatch = useAppDispatch();

    useEffect(() => {


        dispatch(getAllUserOrders())
    }, [dispatch, user, history])


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openReviewForm, setOpenReviewForm] = useState(true);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleClose = () => {
        setOpenReviewForm(false);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (

        <>
            {isLodging ? (
                <Spinner />
            ) : (
                <>
                    <Typography textAlign='center' variant='h4' p={3}>Order list, {orders.length}</Typography>
                    {orders.length === 0 ? (
                        <Typography bgcolor="cadetblue" color='yellow' textAlign='center' variant='h4' p={3}>Currently you have no orders</Typography>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden', mt: [9] }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Payment Method</TableCell>
                                            <TableCell align="right">User name</TableCell>
                                            <TableCell align="right">Total Price</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : orders).map((row) => (
                                                <TableRow key={row._id}>
                                                    <TableCell style={{ width: 100 }} align="left" >{row.paymentMethod}</TableCell>
                                                    <TableCell style={{ width: 100 }} align="right">{user?.name} </TableCell>
                                                    <TableCell style={{ width: 300 }} align="right">{row.totalPrice} $</TableCell>
                                                    <TableCell style={{ width: 160 }} align="right"><Button onClick={() => setOpenReviewForm(true)}>see more</Button></TableCell>
                                                    {openReviewForm && <OrderDetails paymentMethod='123' orderItems={row.orderItems} shippingAddress={row.shippingAddress} open={openReviewForm} onClose={handleClose} />}
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 25, 100]}
                                component="div"
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    )

                    }

                </>
            )}

        </>
    )
}

export default Orders