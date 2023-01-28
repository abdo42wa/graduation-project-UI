import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import { TableRow, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllProduct } from '../reducers/productSlice';
import RejectProduct from '../components/RejectProduct';

const AllProductList = () => {
    const history = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { products } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && !user?.isAdmin)
            history('/')

        dispatch(getAllProduct())
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
    const handleClose = () => {
        setOpenForm(false);
    };

    return (
        <>
            <Typography textAlign='center' variant='h4' p={3}>products list, {products.length}</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: [9] }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">User name</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Moderation Status</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : products).map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell style={{ width: 100 }} align="left" >{row.name}</TableCell>
                                        <TableCell style={{ width: 100 }} align="right">{row.user?.name}</TableCell>
                                        <TableCell style={{ width: 300 }} align="right">{row.status}</TableCell>
                                        <TableCell style={{ width: 300 }} align="right">{row.moderationStatus}</TableCell>
                                        <TableCell style={{ width: 300 }} align="right">{row.price}</TableCell>
                                        <TableCell style={{ width: 160 }} align="right"><Button onClick={() => setOpenForm(true)}>Reject</Button></TableCell>
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
    )
}

export default AllProductList