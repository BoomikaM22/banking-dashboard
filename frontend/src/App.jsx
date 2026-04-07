import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Balance from "./pages/Balance";
import BillPayment from "./pages/BillPayment";
import OpenAccount from "./pages/OpenAccount";
import FundTransfer from "./pages/FundTransfer";
import SearchPage from "./pages/Search";

function AppInner() {
  const { user } = useAuth();

  if (!user) return <Landing />;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          <Routes>
            <Route path="/"             element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/cards"        element={<Cards />} />
            <Route path="/balance"      element={<Balance />} />
            <Route path="/bills"        element={<BillPayment />} />
            <Route path="/open-account" element={<OpenAccount />} />
            <Route path="/transfer"     element={<FundTransfer />} />
            <Route path="/search"       element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
