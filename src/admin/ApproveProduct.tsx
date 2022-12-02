import { useState, useEffect } from 'react';
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

const ApproveProduct = () => {

    const history = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { products } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && !user?.isAdmin)
            history('/')

        dispatch(AdminGetProducts())
    }, [dispatch, user])


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const approveProduct = (id: string) => {
        dispatch(approveProductByID(id))
    }

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
                                        <TableCell style={{ width: 160 }} align="right"><Button onClick={() => approveProduct(row._id!)}>Approve</Button><Button>Reject</Button></TableCell>
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