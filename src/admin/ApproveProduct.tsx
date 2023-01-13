import { useState, useEffect } from 'react';
import RejectProduct from '../components/RejectProduct';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppDispatch, useAppSelector } from '../store';
import { AdminGetProducts, approveProductByID } from '../reducers/productSlice';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'

const ApproveProduct = () => {

    const history = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { products } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && !user?.isAdmin)
            history('/')

        dispatch(AdminGetProducts())
    }, [dispatch, user, history])


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openForm, setOpenForm] = useState(false);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const approveProduct = (id: string, userId: any, productName: string) => {
        const socket = io("http://localhost:5000");
        socket.emit("sendNotification", {
            productID: id,
            message: `Your product ${productName} got approve`,
            receiverId: userId,
            reded: false,
        });
        dispatch(approveProductByID(id))
    }

    const handleClose = () => {
        setOpenForm(false);
    };
    return (
        <>
            <Typography textAlign='center' variant='h4' p={3}>Waiting approve products, {products.length}</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: [9] }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">price</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : products).map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell style={{ width: 100 }}   >{row.name}</TableCell>
                                        <TableCell style={{ width: 100 }} align="right">{row.category?.title}</TableCell>
                                        <TableCell style={{ width: 300 }} align="right">{row.description}</TableCell>
                                        <TableCell style={{ width: 100 }} align="right">{row.price}</TableCell>
                                        <TableCell style={{ width: 160 }} align="right"><Button onClick={() => approveProduct(row._id!, row.user, row.name!)}>Approve</Button><Button onClick={() => setOpenForm(true)}>Reject</Button></TableCell>
                                        {openForm && <RejectProduct open={openForm} onClose={() => handleClose()} productID={row._id!} userID={row.user!} productName={row.name!} />}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
export default ApproveProduct;