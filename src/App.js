import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Coins from "./screens/Coins/Coins";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute, { IsAuth } from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Dashboard from "./screens/Dashboard/Dashboard";
import Homepage from "./screens/Homepage/Homepage";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import ExchangeRate from "./screens/ExchangeRate/ExchangeRate";
import { CoinContextProvider } from "./context/CoinContext";
import ResetPassword from "./screens/ResetPassword/ResetPassword";

function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <CoinContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={
            <IsAuth>
            <Login />
            </IsAuth>
          } />
            <Route path="/signup" element={
            <IsAuth>
            <Signup />
            </IsAuth>
            } />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Sidebar>
                    <Dashboard />
                  </Sidebar>
                </ProtectedRoute>
              }
            />

            <Route
              path="/coins"
              element={
                <ProtectedRoute>
                <Sidebar>
                  <Coins />
                </Sidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/exchange-rate"
              element={
                <ProtectedRoute>
                <Sidebar>
                  <ExchangeRate />
                </Sidebar>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </CoinContextProvider>
      </UserAuthContextProvider>
    </Router>
  );
}

export default App;
