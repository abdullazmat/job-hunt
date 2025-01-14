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
import CreateCompany from "./Components/admin/CreateCompany.js";
import CompanyDescription from "./Components/admin/CompanyDescription.js";
import ViewCompany from "./Components/shared/ViewCompany.js";
import AdminJobs from "./Components/admin/AdminJobs.js";
import JobUpdate from "./Components/admin/JobUpdate.js";
import JobCreate from "./Components/admin/CreateJob.js";
import JobApplicants from "./Components/admin/JobApplicants.js";
import NotFound from "./Components/shared/notFound.js";
import ForgetPassword from "./Components/shared/ForgetPassword.js";
import UpdatePassword from "./Components/shared/UpdatePassword.js";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/jobs" element={<Jobs />}></Route>
            <Route path="/browse" element={<Browse />}></Route>
            <Route path="/forget-password" element={<ForgetPassword />}></Route>
            <Route
              path="/reset-password/:token"
              element={<UpdatePassword />}
            ></Route>

            <Route element={<PrivateRoute />}>
              <Route
                path="/job/description/:id"
                element={<JobDescription />}
              ></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/admin/companies" element={<Companies />}></Route>
              <Route
                path="/admin/companies/create"
                element={<CreateCompany />}
              ></Route>
              <Route
                path="/admin/edit/company/:id"
                element={<CompanyDescription />}
              ></Route>
              <Route
                path="/company/description/:id"
                element={<ViewCompany />}
              ></Route>
              <Route path="/admin/jobs" element={<AdminJobs />}></Route>
              <Route
                path="/admin/jobs/update/:id"
                element={<JobUpdate />}
              ></Route>
              <Route
                path="/admin/jobs/applicants/:id"
                element={<JobApplicants />}
              ></Route>
              <Route path="/admin/jobs/create" element={<JobCreate />}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
