import { useAtom } from 'jotai';
import { userAtom } from '../lib/user';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { serverUrl } from '../lib/data';
import { useTheme } from '@/components/theme-provider';
import { Button as NavButton} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const Navbar = () => {
    const [user, setUser] = useAtom(userAtom);
    const { theme } = useTheme(); // Get the current theme

    return (
        <nav className={`flex items-center justify-between px-6 py-4 ${theme === 'light' ? 'navbar-light' : 'navbar-dark'}`}>            <span style={{ color: '#3F51B5' }} className="text-xl text-blue-500 font-semibold">LearnMaths</span>
            <ul className="flex items-center gap-6 font-medium">
                <li>
                    <NavButton
                        variant="contained"
                        color="primary"
                        startIcon={<HomeIcon/>}
                        component={Link}
                        to="/"
                    >
                        Home
                    </NavButton>
                </li>
                {user == undefined && (
                    <li>
                        <NavButton
                            variant="outlined"
                            color="primary"
                            startIcon={<VpnKeyIcon/>}
                            component={Link}
                            to="/login"
                        >
                            Login
                        </NavButton>
                    </li>
                )}
                {user == undefined && (
                    <li>
                        <NavButton
                            variant="outlined"
                            color="primary"
                            startIcon={<PersonAddIcon/>}
                            component={Link}
                            to="/register"
                        >
                            SignUp
                        </NavButton>
                    </li>
                )}
                {user != undefined && (
                    <li>
                        <NavButton
                            variant="outlined"
                            color="secondary"
                            startIcon={<ExitToAppIcon />}
                            onClick={() => {
                                setUser(undefined);
                                handleLogout();
                            }}
                        >
                            Logout
                        </NavButton>
                    </li>
                )}
                <li>
                    <ModeToggle/>
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
