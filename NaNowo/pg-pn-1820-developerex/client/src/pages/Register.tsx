import React, { useRef, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../lib/user';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { serverUrl } from '../lib/data';
import {  useLocation, useSearchParams } from 'react-router-dom';

const Registration = () => {
    const [user, setUser] = useAtom(userAtom);
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const [register, setRegister] = useState(0);

    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [validUsername, setValidUsername] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const submitForm =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (usernameInput.current == null || emailInput.current == null || passwordInput.current == null) {
            return;
        }

        // Validate username, email, and password here
        const isValidUsername = validateUsername(usernameInput.current.value);
        const isValidEmail = validateEmail(emailInput.current.value);
        const isValidPassword = validatePassword(passwordInput.current.value);

        setValidUsername(isValidUsername);
        setValidEmail(isValidEmail);
        setValidPassword(isValidPassword);

        if (isValidUsername && isValidEmail && isValidPassword) {
            // Perform registration logic here
            const registrationData = {
                username: usernameInput.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value,
            };

            try {
                // Make a request to your Spring backend for registration
                const response = await fetch(`${serverUrl}/api/auth/signup/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registrationData),
                });

                if (response.ok) {

                    // Registration successful
                    setRegister(1)


                } else {
                    // Registration failed
                    // Handle the error, e.g., display an error message
                    console.error('Registration failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                // Handle error as needed
            }
        }
    };
    if (user != undefined) {
        const from = searchParams.get('from');
        if (from != null) {
            return <Navigate to={from} replace />;
        }
        return <Navigate to="/" replace />;
    }

    const validateUsername = (username: string) => {
        // Add your username validation logic here
        // For simplicity, let's just check if it's not empty
        return username.trim() !== '';
    };

    const validateEmail = (email: string) => {
        // Add your email validation logic here
        // For simplicity, let's just check if it contains '@'
        return email.includes('@');
    };

    const validatePassword = (password: string) => {
        // Add your password validation logic here
        // For simplicity, let's just check if it's not empty
        return password.trim() !== '';
    };

    return (<>
        {register == 0 && (
            <form className="flex flex-col gap-2 rounded" onSubmit={submitForm}>
                <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    ref={usernameInput}
                    className={!validUsername ? 'border-red-500' : ''}
                />
                <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    ref={emailInput}
                    className={!validEmail ? 'border-red-500' : ''}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={passwordInput}
                    className={!validPassword ? 'border-red-500' : ''}
                />
                <Button>Register</Button>
            </form>
        )}
    {register != 0 && (
        <h2>
            Please confirm email and login
        </h2>
    )}
        </>
    );
};

export default Registration;
