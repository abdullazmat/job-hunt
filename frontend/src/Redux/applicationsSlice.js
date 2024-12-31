import { createSlice } from "@reduxjs/toolkit";

export const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applicantStatus: null,
  },
  reducers: {
    setApplicantStatus: (state, action) => {
      state.applicantStatus = action.payload;
    },
  },
});

export const { setApplicantStatus } = applicationsSlice.actions;
export default applicationsSlice.reducer;
