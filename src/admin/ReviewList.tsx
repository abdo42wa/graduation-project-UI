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
import { getAllOrders } from '../reducers/orderSlice';
import { deleteReview, getAllReviews } from '../reducers/reviewSlice';

const ReviewList = () => {
    const history = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const { reviews } = useAppSelector(state => state.reviews)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && !user?.isAdmin)
            history('/')

        dispatch(getAllReviews())
    }, [dispatch, user, history])


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Typography textAlign='center' variant='h4' p={3}>Order list, {reviews.length}</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: [9] }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Comment</TableCell>
                                <TableCell align="right">User name</TableCell>
                                <TableCell align="right">Rating</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : reviews).map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell style={{ width: 100 }} align="left" >{row.comment}</TableCell>
                                        <TableCell style={{ width: 100 }} align="right">{row.user?.name}</TableCell>
                                        <TableCell style={{ width: 300 }} align="right">{row.rating}</TableCell>
                                        <TableCell style={{ width: 160 }} align="right"><Button onClick={() => dispatch(deleteReview(row._id!))}>Remove</Button></TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={reviews.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}

export default ReviewList