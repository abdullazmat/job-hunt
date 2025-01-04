import FilterJobCards from "./FilterJobCards";
import { useSelector } from "react-redux";

function FilteredJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="container-fluid p-0">
      {/* Row for Form and Right Section */}
      <div className="row g-0">
        {/* Left Side - Form */}
        <div
          className="col-12 col-md-3 py-4 px-3  border-end "
          style={{
            borderColor: "black",
            borderWidth: "2px",
          }}
        >
          <form>
            {/* Search Term */}
            <div className="d-flex align-items-center mb-2 py-2 border-bottom">
              <b>
                <h4 className="m-0">Filtered Jobs</h4>
              </b>
            </div>

            {/* Location Section */}
            <div className="mb-4">
              <h5 className="m-0 mb-2">Location</h5>
              <div className="d-flex flex-wrap">
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="lahore"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="lahore"
                  >
                    Lahore
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="islamabad"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="islamabad"
                  >
                    Islamabad
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="karachi"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="karachi"
                  >
                    Karachi
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="peshawar"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="peshawar"
                  >
                    Peshawar
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="quetta"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="quetta"
                  >
                    Quetta
                  </label>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="mb-4">
              <h5 className="m-0 mb-2 ">Industry</h5>
              <div className="d-flex flex-wrap">
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="frontend"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="frontend"
                  >
                    FrontEnd
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="backend"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="backend"
                  >
                    BackEnd
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="fullstack"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="fullstack"
                  >
                    Full Stack
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="designing"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="designing"
                  >
                    Designing
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="seo"
                    style={{ border: "1px solid black" }}
                  />
                  <label className="form-check-label fw-bold m-0" htmlFor="seo">
                    SEO
                  </label>
                </div>
              </div>
            </div>

            {/* Job Salary */}
            <div className="mb-4">
              <h5 className="m-0 mb-2">Salary</h5>
              <div className="d-flex flex-wrap">
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="40k"
                    style={{ border: "1px solid black" }}
                  />
                  <label className="form-check-label fw-bold m-0" htmlFor="40k">
                    0 - 40k
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="1lakh"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="1lakh"
                  >
                    40K - 1lakh
                  </label>
                </div>
                <div className="form-check d-flex align-items-center me-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="5lakh"
                    style={{ border: "1px solid black" }}
                  />
                  <label
                    className="form-check-label fw-bold m-0"
                    htmlFor="5lakh"
                  >
                    1- 5 Lakh
                  </label>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="d-flex justify-content-center ">
              <button
                type="submit"
                className="btn w-75 filter-search-btn"
                style={{ backgroundColor: "#334155", color: "white" }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* Right Side - Placeholder */}
        <div className="col-12 col-md-9 py-4">
          <h2 className="ms-3" style={{ color: "#020817" }}>
            Listing Results:
          </h2>
          <div>
            {allJobs && (
              <div className="row g-3">
                {allJobs.map((job, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-sm-12 ">
                    <FilterJobCards id={job._id} job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilteredJobs;
