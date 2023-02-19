import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";



const ProtectedRoute = ({children}) => {
    const {user} = useUserAuth();
    console.log(user)
    if(!user){
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute;