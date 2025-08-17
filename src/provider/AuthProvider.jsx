
import React, { createContext, useEffect, useState } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase.init';
import axios from 'axios';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };


    const createAccount = (email, password, name, photoURL) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) =>
                updateProfile(user, { displayName: name, photoURL }).then(() => {
                    setUser({ ...user, displayName: name, photoURL });
                })
            );
    };

    const LoginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            if (currentUser) {
                axios.post('https://final-server-11.vercel.app/api/jwt', { email: currentUser.email })
                    .then(res => {
                        localStorage.setItem('jwt-token', res.data.token);
                        setUser(currentUser)
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('JWT fetch error:', err);
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem('jwt-token');
                setLoading(false);
                 setUser(null)
            }

            console.log(currentUser);

        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        googleLogin,
        logOut,
        createAccount,
        LoginUser
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;