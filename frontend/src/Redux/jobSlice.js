import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    jobDesc: null,
    searchJobText: "",
    adminJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setJobDesc: (state, action) => {
      state.jobDesc = action.payload;
    },
    setJobByText: (state, action) => {
      state.searchJobText = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
  },
});

export const { setAllJobs, setJobDesc, setJobByText, setAdminJobs } =
  jobSlice.actions;
export default jobSlice.reducer;
