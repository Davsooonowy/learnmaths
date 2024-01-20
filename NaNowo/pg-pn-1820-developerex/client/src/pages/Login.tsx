import { useAtom } from 'jotai';
import { userAtom } from '../lib/user';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {serverUrl} from "@/lib/data.ts";


const Login = () => {
    const [user, setUser] = useAtom(userAtom);
    const [searchParams, _] = useSearchParams();

    const loginInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [validPassword, setValidPassword] = React.useState(true);
    const [validLogin, setValidLogin] = React.useState(true);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loginInput.current == null || passwordInput.current == null) {
            return;
        }
        const loginData = {
            username: loginInput.current.value,
            password: passwordInput.current.value,
        };
        try {
            // Make a request to your Spring backend for registration
            const response = await fetch(`${serverUrl}/api/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                response.json().then((data) => {
                    document.cookie = `authenticationToken=${data.authenticationToken}; path=/`;
                    document.cookie = `refreshToken=${data.refreshToken}; path=/`;
                    setUser(data.id)
                })
                // Registration successful



            } else {
                // Registration failed
                // Handle the error, e.g., display an error message
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error as needed
        }

    };

    if (user != undefined) {
        const from = searchParams.get('from');
        if (from != null) {
            return <Navigate to={from} replace />;
        }
        return <Navigate to="/" replace />;
    }

    return (
        <form className="flex flex-col gap-2 rounded" onSubmit={submitForm}>
            <Input
                type="text"
                placeholder="Login"
                name="login"
                ref={loginInput}
            />
            <Input
                type="password"
                placeholder="Password"
                name="password"
                ref={passwordInput}
            />
            <Button>Login</Button>
        </form>
    );
};

export default Login;
