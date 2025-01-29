import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeadFormData } from "../types/lead";

interface LeadState {
  formData: LeadFormData | null;
  isSubmitting: boolean;
  error: string | null;
}

const initialState: LeadState = {
  formData: null,
  isSubmitting: false,
  error: null,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<LeadFormData>) => {
      state.formData = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetForm: (state) => {
      state.formData = null;
      state.isSubmitting = false;
      state.error = null;
    },
  },
});

export const { setFormData, setSubmitting, setError, resetForm } =
  leadSlice.actions;
export default leadSlice.reducer;
