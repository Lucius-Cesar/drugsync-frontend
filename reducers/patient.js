import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    currentTreatment: [],
    pathologies: []
  },
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    loadPatientInfo: (state, action) => {
      state.value = action.payload;
    },
    addDrugToCurrentTreatment: (state, action) => {
        state.value.currentTreatment.push(action.payload)
    },
    removeDrugFromCurrentTreatment: (state, action) => {
        state.value.currentTreatment = state.value.currentTreatment.filter(drug => drug.name !== action.payload)
    },
    addPathology: (state, action) => {
        state.value.pathologies.push(action.payload)

    },
    removePathology: (state, action) => {
        state.value.pathologies = state.value.pathologies.filter(pathology => pathology.name !== action.payload)
    },
    resetPatientReducer: (state, action) => {
      state.value = initialState.value
    }
  },
});

export const {loadPatientInfo, addDrugToCurrentTreatment, removeDrugFromCurrentTreatment, addPathology, removePathology, resetPatientReducer} = patientSlice.actions;
export default patientSlice.reducer;
