import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { AdminUsers } from './AdminUsers';
import { Forbiden } from '../Forbiden';

export function Users() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminUsers />;
    }

    return <Forbiden />;
}