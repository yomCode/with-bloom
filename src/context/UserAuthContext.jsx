import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, 
    
 } from "firebase/auth";

 import { auth } from "../firebase/Firebase";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({}); 

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const  logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser);
            
        })
        return () => {
            unsubscribe();
        }
    }, [])
    console.log(user)
    return <userAuthContext.Provider value={{signup, login, logout, user}}> {children} </userAuthContext.Provider>
}



export const useUserAuth = () => {
    return useContext(userAuthContext)
}