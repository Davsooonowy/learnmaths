import { useAtom } from 'jotai';
import { userAtom } from '../lib/user';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Button, buttonVariants } from './ui/button';
import { serverUrl } from '../lib/data';

const Navbar = () => {
    const [user, setUser] = useAtom(userAtom);

    return (
        <nav className="flex items-center justify-between px-6 py-4">
            <span className="text-xl font-semibold">LearnMaths</span>
            <ul className="flex items-center gap-6 font-medium">
                <li>
                    <Link
                        to="/"
                        className={buttonVariants({ variant: 'link' })}
                    >
                        Home
                    </Link>
                </li>
                {user== undefined && (
                    <li>
                        <a
                            href="/login"
                            className={buttonVariants({ variant: 'outline' })}
                        >
                            Login
                        </a>
                    </li>
                )}
                {user == undefined && (
                    <li>
                        <a
                            href="/register"
                            className={buttonVariants({ variant: 'outline' })}
                        >
                            SignUp
                        </a>
                    </li>
                )}
                {user != undefined && (
                    <li>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setUser(undefined );
                                handleLogout();
                            }}
                        >
                            Logout
                        </Button>
                    </li>
                )}
                <li>
                    <ModeToggle />
                </li>
            </ul>
        </nav>
    );
};


async function handleLogout() {
    const refreshTokenCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('refreshToken='));

    const refreshToken = refreshTokenCookie ? refreshTokenCookie.split('=')[1] : undefined;

    try {
        const res = await fetch(`${serverUrl}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
        });

        document.cookie = `authenticationToken=; path=/`;
        document.cookie = `refreshToken=; path=/`;

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Error during the request:', error);
    }
}


export default Navbar;
