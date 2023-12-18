import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

function LoginForm({ setIsLoggedIn, handleClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSwitchChange = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
            handleClose();
        } else {
            setError('Nieprawidłowe dane logowania');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                p: 2,
                width: 300,
                height: 300,
                margin: 'auto',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Typography variant="h5" component="h2">
                {isLogin ? 'Login' : 'Register'}
            </Typography>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                {isLogin ? 'Login' : 'Register'}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="body2" component="p" sx={{ cursor: 'pointer' }} onClick={handleSwitchChange}>
                {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
            </Typography>
        </Box>
    );
}

export default LoginForm;