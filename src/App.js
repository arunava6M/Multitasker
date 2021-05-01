import "./App.css";

import Box from "./components/Box";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Box orangy shadow>
        <div className="sidePanel"></div>
        <Dashboard />
      </Box>
    </div>
  );
}

export default App;
