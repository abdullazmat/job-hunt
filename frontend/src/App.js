import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/user/Header.js";
import Home from "./Pages/Home.js";
import SignUp from "./Pages/SignUp.js";
import LogIn from "./Pages/LogIn.js";
import Jobs from "./Pages/Jobs.js";
import Footer from "./Components/user/Footer.js";
import Browse from "./Pages/Browse.js";
import Profile from "./Components/user/Profile.js";
import JobDescription from "./Pages/JobDescription.js";
import PrivateRoute from "./Components/user/PrivateRoute.js";
import Companies from "./Components/admin/Companies.js";

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
        <Route path="/browse" element={<Browse />}></Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/job/description/:id"
            element={<JobDescription />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin/companies" element={<Companies />}></Route>
          <Route path="/admin/jobs" element={<Browse />}></Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
