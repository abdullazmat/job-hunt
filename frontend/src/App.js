import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.js";
import Home from "./Pages/Home.js";
import SignUp from "./Pages/SignUp.js";
import LogIn from "./Pages/LogIn.js";
import Jobs from "./Pages/Jobs.js";
import Footer from "./Components/Footer.js";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
