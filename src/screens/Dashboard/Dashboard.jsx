import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Classes from "./Dashboard.module.css"


const Dashboard = ({children}) => {
    return(
        <div className={Classes.container}>
            <h1>Welcome to your dashboard;</h1>
        </div>
    )
}

export default Dashboard;