// import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const Dashboard = () => {
    const { currentUser, isLoading } = useUser();
    console.log('currentUser',currentUser)

    const role = currentUser?.role;
    console.log('role',role)


    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    if(role === "admin") return <Navigate to="/dashboard/admin-home" replace/>;
    if(role === "seller") return <Navigate to="/dashboard/seller-home" replace />;
    if(role === "user") return <Navigate to="/dashboard/user-home" replace/>;
};

export default Dashboard;