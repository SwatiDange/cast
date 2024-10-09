
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserss, DisplayUserss } from '../redux/action';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    TextField,
} from '@mui/material';

const DisplayUser = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.users);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id) => {
        dispatch(DeleteUserss(id));
    };

    useEffect(() => {
        dispatch(DisplayUserss());
    }, [dispatch]);

    // Filter users based on the search query across multiple fields
    const filteredUsers = data?.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) || // Assuming  phone is strictly numeric
        user.password.includes(searchQuery) // Assuming password can be any string
    );

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Display Users
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link} // Using Link for navigation
                to="/add" // Adjust the path to your add user route
                style={{ marginBottom: '20px' }} // Space below the button
            >
                Add User
            </Button>
            <TextField
                variant="outlined"
                label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }} // Space below the input
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                                        <Link to={`add/${user.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                            Update
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default DisplayUser;
