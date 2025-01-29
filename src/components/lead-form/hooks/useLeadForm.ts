import { useState } from "react";
import { useDispatch } from "react-redux";
import { JsonFormsCore } from "@jsonforms/core";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { LeadFormData, FormErrors } from "../types";
import { setFormData, setSubmitting, setError } from "../../../store/leadSlice";
import { addLead } from "../../../store/leadsSlice";

export const useLeadForm = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<Partial<LeadFormData>>({});
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const [helpText, setHelpText] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showValidation, setShowValidation] = useState(false);
  const [jsonFormsErrors, setJsonFormsErrors] = useState<
    JsonFormsCore["errors"]
  >([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (selectedVisas.length === 0) {
      errors.visaCategories = "Please select at least one visa category";
      isValid = false;
    }

    if (!resumeFile) {
      errors.resume = "Please upload your resume/CV";
      isValid = false;
    }

    if (!helpText.trim()) {
      errors.helpText = "Please provide information about your case";
      isValid = false;
    } else if (helpText.trim().length < 50) {
      errors.helpText =
        "Please provide more detailed information (at least 50 characters)";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid && (jsonFormsErrors?.length ?? 0) === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);

    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    dispatch(setSubmitting(true));

    try {
      const formDataWithVisas = {
        ...formState,
        visaCategories: selectedVisas,
        additionalInfo: helpText,
        resume: resumeFile ? resumeFile.name : null,
      };

      if (
        formDataWithVisas.firstName &&
        formDataWithVisas.lastName &&
        formDataWithVisas.countryOfResidence
      ) {
        const newLead = {
          id: uuidv4(),
          name: `${formDataWithVisas.firstName} ${formDataWithVisas.lastName}`,
          submittedAt: new Date().toISOString(),
          country: formDataWithVisas.countryOfResidence,
          status: "pending" as const,
        };

        dispatch(addLead(newLead));
      }

      dispatch(setFormData(formDataWithVisas as LeadFormData));
      setShowSuccessModal(true);

      // Reset form
      setFormState({});
      setSelectedVisas([]);
      setHelpText("");
      setResumeFile(null);
      setShowValidation(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const handleChange = ({
    data,
    errors,
  }: Pick<JsonFormsCore, "data" | "errors">) => {
    setFormState(data);
    setJsonFormsErrors(errors || []);
    if (showValidation && errors && errors.length > 0 && errors[0].message) {
      dispatch(setError(errors[0].message));
    } else {
      dispatch(setError(null));
    }
  };

  const handleVisaChange = (visaId: string) => {
    const newSelectedVisas = selectedVisas.includes(visaId)
      ? selectedVisas.filter((id) => id !== visaId)
      : [...selectedVisas, visaId];

    setSelectedVisas(newSelectedVisas);
    if (showValidation) {
      setFormErrors((prev) => ({
        ...prev,
        visaCategories:
          newSelectedVisas.length === 0
            ? "Please select at least one visa category"
            : undefined,
      }));
    }
  };

  const handleHelpTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setHelpText(value);
    if (showValidation) {
      if (!value.trim()) {
        setFormErrors((prev) => ({
          ...prev,
          helpText: "Please provide information about your case",
        }));
      } else if (value.trim().length < 50) {
        setFormErrors((prev) => ({
          ...prev,
          helpText:
            "Please provide more detailed information (at least 50 characters)",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          helpText: undefined,
        }));
      }
    }
  };

  return {
    formState,
    selectedVisas,
    helpText,
    resumeFile,
    formErrors,
    showValidation,
    showSuccessModal,
    setShowSuccessModal,
    setResumeFile,
    handleSubmit,
    handleChange,
    handleVisaChange,
    handleHelpTextChange,
  };
};
