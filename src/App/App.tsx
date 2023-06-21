import type { FC } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Agents from "../views/Agents";
import CreateAgent from "../views/Agents/CreateAgent";
import AgentDetails from "../views/AgentDetails.tsx";

const App: FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Agents />}/>
          <Route path="/create" element={<CreateAgent />}/>
          <Route path="/agent/:id" element={<AgentDetails />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
