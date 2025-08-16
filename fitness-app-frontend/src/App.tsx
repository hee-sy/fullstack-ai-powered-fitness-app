import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <button>LOGIN</button>
    </Router>
  );
}

export default App;
