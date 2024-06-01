import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return unsubscribe;
    }, []);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        })
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const authInfo = { user, loading, createUser, signIn, updateUserProfile, googleSignIn, logOut }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;