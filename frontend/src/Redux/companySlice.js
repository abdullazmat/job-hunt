import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: null,
    adminCompanies: [],
  },
  reducers: {
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
    setAdminCompanies: (state, action) => {
      state.adminCompanies = action.payload;
    },
  },
});

export const { setCompanyData, setAdminCompanies } = companySlice.actions;
export default companySlice.reducer;
