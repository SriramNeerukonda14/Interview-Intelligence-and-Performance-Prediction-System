import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Predict from "../pages/Predict";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/predict" element={<Predict />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}