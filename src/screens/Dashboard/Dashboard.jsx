import React from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import Classes from "./Dashboard.module.css"


const Dashboard = ({children}) => {

    const {user} = useUserAuth();

    return(
        <div className={Classes.container}>
            <h1>Welcome  {user.email} </h1>
        </div>
    )
}

export default Dashboard;