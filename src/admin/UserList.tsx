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
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../reducers/userSlice';

const UserList = () => {
    const history = useNavigate()
    const { user, users } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && !user?.isAdmin)
            history('/')

        dispatch(getAllUsers())
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
            <Typography textAlign='center' variant='h4' p={3}>Order list, {users.length}</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: [9] }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="right">User name</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users).map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell style={{ width: 100 }} align="left" >{row.email}</TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell style={{ width: 100 }} align="right">{row.name}</TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell style={{ width: 300 }} align="right">{row.email_verified ? 'verified' : ' Not verified'}</TableCell>
                                        <TableCell style={{ width: 300 }} align="right">{row.type}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}

export default UserList