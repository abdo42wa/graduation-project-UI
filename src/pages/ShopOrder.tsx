
import { useState, useEffect } from 'react';
import { Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllSellerOrders } from '../reducers/orderSlice';
import Spinner from '../components/Spinner';
import UpdateOrderStatus from '../components/UpdateOrderStatus';
import AddressPopUp from '../components/AddressPopUp';

const ShopOrder = () => {

    const history = useNavigate()
    const location = useLocation();
    const { user } = useAppSelector(state => state.user)
    const { sellerOrders, isLodging } = useAppSelector(state => state.order)
    const dispatch = useAppDispatch();



    useEffect(() => {

        dispatch(getAllSellerOrders())

    }, [dispatch, user, history])


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openForm, setOpenForm] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleClose = () => {
        setOpenForm(false);
        setShowDialog(false);
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
                    <Typography textAlign='center' variant='h4' p={3}>Order list</Typography>
                    {sellerOrders.length === 0 ? (
                        <Typography bgcolor="cadetblue" color='yellow' textAlign='center' variant='h4' p={3}>Currently you have no orders</Typography>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden', mt: [9] }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Product Name</TableCell>
                                            <TableCell align="left"> User Address</TableCell>
                                            <TableCell align="right">Product Image</TableCell>
                                            <TableCell align="right">Product Status</TableCell>
                                            <TableCell align="right">Product Price</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            (
                                                rowsPerPage > 0
                                                    ? sellerOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : sellerOrders).map((row) => (
                                                        <TableRow key={row._id}>
                                                            <TableCell style={{ width: 100 }} align="left" >{row.name!}</TableCell>
                                                            <TableCell style={{ width: 100 }} align="left" >{row.name!}</TableCell>
                                                            <TableCell style={{ width: 200 }} align="right"><img src={row.image} width="200px" /></TableCell>
                                                            <TableCell style={{ width: 100 }} align="right">{row.status} </TableCell>
                                                            <TableCell style={{ width: 100 }} align="right">{row.price} $</TableCell>
                                                            <TableCell style={{ width: 160 }} align="right"><Button onClick={() => setOpenForm(true)}>Update status</Button> <Button onClick={() => setShowDialog(true)}>Get user Address</Button></TableCell>
                                                            {openForm && <UpdateOrderStatus status={row.status!} open={openForm} onClose={() => handleClose()} productID={row._id!} />}
                                                            {showDialog && <AddressPopUp open={showDialog} onClose={() => handleClose()} userID={row.user!} />}

                                                        </TableRow>
                                                    )
                                                    )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 25, 100]}
                                component="div"
                                count={sellerOrders.length}
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


export default ShopOrder