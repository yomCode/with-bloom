import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Coins from "./screens/Coins/Coins";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import { UserAuthContextProvider} from "./context/UserAuthContext";
import Dashboard from "./screens/Dashboard/Dashboard";
import Homepage from "./screens/Homepage/Homepage";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import ExchangeRate from "./screens/ExchangeRate/ExchangeRate";


function App() {

  

  return (
      <Router>
        <UserAuthContextProvider >
        <Navbar />
          <Routes>
           <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
            <ProtectedRoute>
              <Sidebar>
                <Dashboard />
              </Sidebar>
            </ProtectedRoute>
            } />
            <Route path="/coins" element={ 
            <Sidebar>
              <Coins />
            </Sidebar>} />
            <Route path="/exchange-rate" element={ 
            <Sidebar>
              <ExchangeRate />
            </Sidebar>} />
          </Routes>
          <Footer />
          </UserAuthContextProvider>
      </Router>
  );
}

export default App;
