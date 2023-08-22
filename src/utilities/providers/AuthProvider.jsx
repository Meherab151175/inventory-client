import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { app } from './../../config/firebase.config';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');
    const [control,setControl] = useState(false)

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const signUp =  (email, password) => {
            setLoader(true)
            return createUserWithEmailAndPassword(auth, email, password)     
    }
    const login = async (email, password) => {
        try {
            setLoader(true)
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setError(error.code)
            throw error
        }
    }
    const logout = async () => {
        try {
            return await signOut(auth)
        } catch (error) {
            setError(error.code)
            throw error
        }
    }
    const updateUser = async (displayName, photo) => {
        try {
            await updateProfile(auth.currentUser, { displayName: displayName, photoURL: photo })
            setUser(auth.currentUser)

        } catch (error) {
            setError(error.code)
            throw error
        }
    }
    const googleLogin = async () => {

        try {
            setLoader(true)
            return await signInWithPopup(auth, googleProvider)
        } catch (error) {
            setError(error.code)
            throw error
        }
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {

                axios.post('https://inventory-server-seven.vercel.app/jwt', { email: user?.email })
                    .then(data => {
                        
                        if (data.data?.token) {
                            localStorage.setItem('access-token', data.data?.token);
                            setLoader(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoader(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);


    const contextVale = { control,setControl,user, loader, setLoader, signUp, login, logout, updateUser, error, setError , googleLogin }
    return (
        <AuthContext.Provider value={contextVale}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;