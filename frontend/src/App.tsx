import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateCampaign from "./pages/CreateCampaign"
import Detail from "./pages/Detail"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  )
}

export default App
