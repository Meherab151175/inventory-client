import React from 'react';
import { Navigate} from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { currentUser } = useUser();
   
    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/dashboard" />
    }


    return children;
};

export default AdminRoute;