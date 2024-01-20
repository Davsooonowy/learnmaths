import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../lib/user';

const ProtectedRoute: FC<{ children: ReactElement }> = ({ children }) => {
    const user = useAtomValue(userAtom);
    const location = useLocation();

    if (user == undefined) {
        return <Navigate to={`/login?from=${location.pathname}`} replace />;
    }
    return children;
};

export default ProtectedRoute;
