import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    jobDesc: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setJobDesc: (state, action) => {
      console.log("Updating Redux State:", action.payload); // Log the dispatched payload
      state.jobDesc = action.payload;
    },
  },
});

export const { setAllJobs, setJobDesc } = jobSlice.actions;
export default jobSlice.reducer;
