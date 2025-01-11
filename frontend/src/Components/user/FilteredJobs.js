import FilterJobCards from "./FilterJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "../../Hooks/useGetAllJobs";
import useGetAppliedJobs from "../../Hooks/useGetAppliedJobs";
import { useState, useEffect } from "react";

function FilteredJobs() {
  const { allJobs, jobDesc } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const categories = [
    "FrontEnd",
    "BackEnd",
    "FullStack",
    "DevOps",
    "AI",
    "Development",
    "Designing",
    "Marketing",
  ];

  const locations = [
    "lahore",
    "karachi",
    "islamabad",
    "peshawar",
    "quetta",
    "multan",
    "faisalabad",
    "rawalpindi",
  ];

  useGetAllJobs([jobDesc]);
  useGetAppliedJobs([allJobs]);

  // States for checkbox filters
  const [selectedLocations, setSelectedLocations] = useState({});
  const [selectedIndustries, setSelectedIndustries] = useState({});
  const [selectedSalaries, setSelectedSalaries] = useState({});
  const [filteredJobs, setFilteredJobs] = useState(allJobs || []);

  // Handle checkbox state changes
  const handleChange = (e, setFilterState) => {
    const { id, checked } = e.target;
    setFilterState((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // Filter jobs based on selected criteria
  useEffect(() => {
    const filterJobs = () => {
      if (!allJobs) return;

      const activeLocations = Object.keys(selectedLocations).filter(
        (key) => selectedLocations[key]
      );
      const activeIndustries = Object.keys(selectedIndustries).filter(
        (key) => selectedIndustries[key]
      );
      const activeSalaries = Object.keys(selectedSalaries).filter(
        (key) => selectedSalaries[key]
      );

      const filtered = allJobs.filter((job) => {
        const matchesLocation =
          activeLocations.length > 0
            ? activeLocations.includes(job.location.toLowerCase())
            : true;

        const matchesIndustry =
          activeIndustries.length > 0
            ? activeIndustries.some((industry) =>
                job.title?.toLowerCase().includes(industry.toLowerCase())
              )
            : true;

        const matchesSalary =
          activeSalaries.length > 0
            ? activeSalaries.some((salaryRange) => {
                if (salaryRange === "40k") return job.salary <= 40000;
                if (salaryRange === "1lakh")
                  return job.salary > 40000 && job.salary <= 100000;
                if (salaryRange === "5lakh") return job.salary > 100000;
                return false;
              })
            : true;

        return matchesLocation && matchesIndustry && matchesSalary;
      });

      setFilteredJobs(filtered);
    };

    filterJobs();
  }, [allJobs, selectedLocations, selectedIndustries, selectedSalaries]);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Left Sidebar with Filters */}
        <div
          className="col-12 col-md-3 py-4 px-3 border-end"
          style={{
            borderColor: "black",
            borderWidth: "2px",
          }}
        >
          <form>
            {/* Filter Header */}
            <div className="d-flex align-items-center mb-2 py-2 border-bottom">
              <b>
                <h4 className="m-0">Filtered Jobs</h4>
              </b>
            </div>

            {/* Location Filters */}
            <div className="mb-4">
              <h5 className="m-0 mb-2">Location</h5>
              <div className="d-flex flex-wrap">
                {locations.map((location) => (
                  <div
                    key={location}
                    className="form-check d-flex align-items-center me-4 mb-2"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      id={location}
                      style={{ border: "1px solid black" }}
                      checked={selectedLocations[location] || false}
                      onChange={(e) => handleChange(e, setSelectedLocations)}
                    />
                    <label
                      className="form-check-label fw-bold m-0"
                      htmlFor={location}
                    >
                      {location.charAt(0).toUpperCase() + location.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Filters */}
            <div className="mb-4">
              <h5 className="m-0 mb-2">Industry</h5>
              <div className="d-flex flex-wrap">
                {categories.map((industry) => (
                  <div
                    key={industry}
                    className="form-check d-flex align-items-center me-4 mb-2"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      id={industry}
                      style={{ border: "1px solid black" }}
                      checked={selectedIndustries[industry] || false}
                      onChange={(e) => handleChange(e, setSelectedIndustries)}
                    />
                    <label
                      className="form-check-label fw-bold m-0"
                      htmlFor={industry}
                    >
                      {industry.charAt(0).toUpperCase() + industry.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Filters */}
            <div className="mb-4">
              <h5 className="m-0 mb-2">Salary</h5>
              <div className="d-flex flex-wrap">
                {["40k", "1lakh", "5lakh"].map((salary) => (
                  <div
                    key={salary}
                    className="form-check d-flex align-items-center me-4 mb-2"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      id={salary}
                      style={{ border: "1px solid black" }}
                      checked={selectedSalaries[salary] || false}
                      onChange={(e) => handleChange(e, setSelectedSalaries)}
                    />
                    <label
                      className="form-check-label fw-bold m-0"
                      htmlFor={salary}
                    >
                      {salary === "40k"
                        ? "0 - 40K"
                        : salary === "1lakh"
                        ? "40K - 1Lakh"
                        : "1 - 5Lakh"}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Right Section - Job Listings */}
        <div className="col-12 col-md-9 py-4">
          <h2 className="ms-3" style={{ color: "#020817" }}>
            Listing Results:
          </h2>
          <div>
            {filteredJobs && filteredJobs.length > 0 ? (
              <div className="row g-3">
                {filteredJobs.map((job, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                    <FilterJobCards
                      id={job._id}
                      job={job}
                      userApplied={job?.applications.includes(user?._id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No jobs found based on selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilteredJobs;
