import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applicantStatus: null,
    jobApplications: [],
  },
  reducers: {
    setApplicantStatus: (state, action) => {
      state.applicantStatus = action.payload;
    },
    setJobApplications: (state, action) => {
      state.jobApplications = action.payload;
    },
  },
});

export const { setApplicantStatus, setJobApplications } =
  applicationSlice.actions;
export default applicationSlice.reducer;
