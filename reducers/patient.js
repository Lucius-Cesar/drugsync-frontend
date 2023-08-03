import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    currentTreatment: [
        {
            name: "",
            rxcui: ""
        }
    ],
        pathologies: []
  },
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    loadPatientsInfo: (state, action) => {
      state.value = action.payload;
    },
    AddDrugToCurrentTreatment: (state, action) => {
        state.value.currentTreatment.push(action.payload)
    },
    removeDrugFromCurrentTreatment: (state, action) => {
        state.value.currentTreatment = state.value.currentTreatment.filter(drug => drug.name !== action.payload)
    },
    AddPathology: (state, action) => {
        state.value.pathologies.push(action.payload)

    },
    removePathology: (state, action) => {
        state.value.pathologies = state.value.pathologies.filter(pathologyName => pathologyName !== action.payload)
    },
  },
});

export const {loadPatientsInfo, AddDrugToCurrentTreatment, removeDrugFromCurrentTreatment, AddPathology, removePathology} = patientSlice.actions;
export default patientSlice.reducer;
