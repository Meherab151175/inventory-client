import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Navigate} from 'react-router-dom';

const SellerRoute = ({ children }) => {
    const { currentUser } = useUser();
   
    if (!currentUser ||  currentUser.role !== 'seller') {
        return <Navigate to="/dashboard" />
    }


    return children;
};

export default SellerRoute;