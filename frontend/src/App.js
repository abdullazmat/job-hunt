import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.js";
import Home from "./Pages/Home.js";
import SignUp from "./Pages/SignUp.js";
import LogIn from "./Pages/LogIn.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
