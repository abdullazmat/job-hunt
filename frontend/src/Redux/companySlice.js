import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: null,
    adminCompanies: [],
    searchCompanyText: "",
  },
  reducers: {
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
    setAdminCompanies: (state, action) => {
      state.adminCompanies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyText = action.payload;
    },
  },
});

export const { setCompanyData, setAdminCompanies, setSearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
