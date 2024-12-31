import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      console.log("Updating Redux State:", action.payload); // Log the dispatched payload
      state.allJobs = action.payload;
    },
  },
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
