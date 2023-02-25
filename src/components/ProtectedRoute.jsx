import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";



export const IsAuth = ({children}) => {
    const {user} = useUserAuth();
    if(!user){
        return children;
    }
    return <Navigate to="/dashboard" />;
}


const ProtectedRoute = ({children}) => {
    const {user} = useUserAuth();
    console.log(user)
    if(!user){
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute;
