
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import './App.css';
import { Cursor } from "./components/cursor";



function App() {
  return (
    <>
      <Cursor />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
