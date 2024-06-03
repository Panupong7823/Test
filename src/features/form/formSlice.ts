import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface FormState {
  key: React.Key;
  prefix: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  idCard: string;
  gender: string;
  phoneCountry: string;
  phoneNumber: string;
  passport: string;
  expectedSalary: number;
  formData: FormState[]; 
}

export const initialState: FormState = {
  key: '',
  prefix: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  nationality: "",
  idCard: "",
  gender: "",
  phoneCountry: "",
  phoneNumber: "",
  passport: "",
  expectedSalary: 0,
  formData: [], 
};

type FormField = keyof FormState;

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: FormField; value: any }>
    ) => {
      const { field, value } = action.payload;

      if (field in state) {
        switch (field) {
          case "prefix":
          case "firstName":
          case "lastName":
          case "birthDate":
          case "nationality":
          case "idCard":
          case "passport":
            if (typeof value === "string") {
              state[field] = value;
            }
            break;
          case "gender":
            if (
              Array.isArray(value) &&
              value.every((v) => typeof v === "string")
            ) {
              state[field] = value.join(", ");
            }
            break;
          case "phoneCountry":
          case "phoneNumber":
            if (typeof value === "string") {
              state[field] = value;
            }
            break;
          case "expectedSalary":
            if (typeof value === "number") {
              state[field] = value;
            }
            break;
        }
      }
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
    updateFormData: (state, action: PayloadAction<FormState[]>) => {
      state.formData.push(...action.payload); 
    },
    

    deleteFormData: (state) => {
      state.formData = [];
    },
  },
});

export const { updateField, resetForm, updateFormData, deleteFormData } =
  formSlice.actions;

export const selectFormData = (state: RootState) => state.form.formData;

export default formSlice.reducer;
