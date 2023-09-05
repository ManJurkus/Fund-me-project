import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { AdminFunds } from './AdminFunds';
import { UserFunds } from './UserFunds';
import { Forbiden } from '../Forbiden';

export function Funds() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminFunds />;
    }

    if (role === 'user') {
        return <UserFunds />;
    }

    return <Forbiden />;
}