import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Charts from "./pages/Charts";
import MonthlyChart from "./pages/MonthlyChart";
import Upload from "./pages/Upload";
import AddTransaction from "./pages/AddTransaction";

function App() {

  return (

    <div
      style={{
        display: "flex"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1
        }}
      >

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/add"
            element={<AddTransaction />}
          />

          <Route
            path="/insights"
            element={<Insights />}
          />

          <Route
            path="/charts"
            element={<Charts />}
          />

          <Route
            path="/monthly"
            element={<MonthlyChart />}
          />

          <Route
            path="/upload"
            element={<Upload />}
          />

        </Routes>

      </div>

    </div>

  );

}

export default App;