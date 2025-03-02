import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userAddress: "",
  factoryContractAddress: "",
  doctorRegistryAddress: "",
  patientRegistryAddress: "",
  hospitalName: "",
  hospitalAddress: "",
  email: "",

};
export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setFactoryContractAddress: (state, action) => {
      state.factoryContractAddress = action.payload;
    },
    setDoctorRegistryAddress: (state, action) => {
      state.doctorRegistryAddress = action.payload;
    },
    setPatientRegistryAddress: (state, action) => {
      state.patientRegistryAddress = action.payload;
    },
    setHospitalName: (state, action) => {
      state.hospitalName = action.payload;
    },
    setHospitalAddress: (state, action) => {
      state.hospitalAddress = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  
  },
});

export const {
  setUserName,
  setUserAddress,
  setFactoryContractAddress,
  setDoctorRegistryAddress,
  setPatientRegistryAddress,
  setHospitalName,
  setHospitalAddress,
  setEmail,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
