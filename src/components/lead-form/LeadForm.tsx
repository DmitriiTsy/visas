import React from "react";
import { JsonFormsCore } from "@jsonforms/core";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { LeadFormData, FormErrors } from "./types";
import { setFormData, setSubmitting, setError } from "../../store/leadSlice";
import { addLead } from "../../store/leadsSlice";
import { v4 as uuidv4 } from "uuid";
import { FormContainer } from "./styles";
import FormHeader from "./FormHeader";
import BasicInfoForm from "./BasicInfoForm";
import ResumeUploadSection from "./ResumeUploadSection";
import VisaCategoriesSection from "./VisaCategoriesSection";
import HelpSection from "./HelpSection";
import SuccessModal from "./SuccessModal";

interface JsonFormsError {
  instancePath: string;
  message?: string;
  schemaPath: string;
  keyword: string;
  params: Record<string, unknown>;
}

const LeadForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = React.useState<Partial<LeadFormData>>({});
  const [selectedVisas, setSelectedVisas] = React.useState<string[]>([]);
  const [helpText, setHelpText] = React.useState("");
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});
  const [showValidation, setShowValidation] = React.useState(false);
  const [jsonFormsErrors, setJsonFormsErrors] = React.useState<
    JsonFormsError[]
  >([]);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

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
    return isValid && jsonFormsErrors.length === 0;
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
    setJsonFormsErrors(
      errors?.map((error) => ({
        instancePath: error.instancePath,
        message: error.message,
        schemaPath: error.schemaPath,
        keyword: error.keyword,
        params: error.params,
      })) || []
    );
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

  return (
    <FormContainer>
      <FormHeader />
      <form onSubmit={handleSubmit} noValidate>
        <BasicInfoForm
          data={formState}
          showValidation={showValidation}
          onChange={handleChange}
        />
        <ResumeUploadSection
          onFileChange={setResumeFile}
          hasError={showValidation && !!formErrors.resume}
          errorMessage={showValidation ? formErrors.resume : undefined}
        />
        <VisaCategoriesSection
          selectedVisas={selectedVisas}
          onVisaChange={handleVisaChange}
          error={formErrors.visaCategories}
          showValidation={showValidation}
        />
        <HelpSection
          helpText={helpText}
          onHelpTextChange={handleHelpTextChange}
          error={formErrors.helpText}
          showValidation={showValidation}
          onSubmit={handleSubmit}
        />
      </form>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </FormContainer>
  );
};

export default LeadForm;
