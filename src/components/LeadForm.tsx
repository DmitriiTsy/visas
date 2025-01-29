import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonFormsCore } from "@jsonforms/core";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { BiCube } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { leadFormSchema, uiSchema, LeadFormData } from "../types/lead";
import { setFormData, setSubmitting, setError } from "../store/leadSlice";
import { FormContainer } from "./StyledComponents";
import styled from "@emotion/styled";
import FileUpload from "./FileUpload";
import { addLead } from "../store/leadsSlice";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const SectionHeader = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a4a4a;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const IconHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Icon = styled.div`
  color: #2563eb;
  font-size: 2.5rem;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 2rem;
    height: 32px;
  }
`;

const VisaCategoriesSection = styled.div`
  margin: 2rem auto;
  padding: 2rem 1rem 0;
  border-top: 1px solid #e5e7eb;
  max-width: 800px;

  @media (max-width: 768px) {
    margin: 1.5rem auto;
    padding-top: 1.5rem;
  }
`;

const VisaCategoriesTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  color: #4a4a4a;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(37, 99, 235, 0.05);
  }

  input {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 2px solid #2563eb;
    border-radius: 0.25rem;
    outline: none;
    transition: all 0.2s;

    &:checked {
      background-color: #2563eb;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 4px;
        top: 1px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HelpSection = styled.div`
  margin: 3rem auto;
  max-width: 800px;
  text-align: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 2rem auto;
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  margin: 1.5rem 0 0.5rem;
  border: 1px solid ${(props) => (props.hasError ? "#dc2626" : "#e5e7eb")};
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${(props) =>
    props.hasError ? "rgba(220, 38, 38, 0.05)" : "white"};
  color: #1a1a1a;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#dc2626" : "#2563eb")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.hasError ? "rgba(220, 38, 38, 0.1)" : "rgba(37, 99, 235, 0.1)"};
  }

  @media (max-width: 768px) {
    min-height: 100px;
    margin: 1rem 0 0.5rem;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
`;

const SubmitButtonLarge = styled.button`
  width: 100%;
  height: 60px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin-top: 1.5rem;

  &:hover {
    background-color: #1a1a1a;
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    height: 50px;
    font-size: 1rem;
  }
`;

const CompactFileUploadSection = styled.div`
  margin: 1rem 0;
  max-width: 800px;
`;

const CompactSectionTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  text-align: left;
`;

interface FormErrors {
  visaCategories?: string;
  helpText?: string;
  resume?: string;
}

interface JsonFormsError {
  instancePath: string;
  message?: string;
  schemaPath: string;
  keyword: string;
  params: Record<string, unknown>;
}

const visaOptions = [
  { id: "o1", label: "O1" },
  { id: "eb1a", label: "EB-1A" },
  { id: "eb2niw", label: "EB-2 NIW" },
  { id: "unknown", label: "I Don't Know" },
];

const SuccessModalContent = styled.div`
  text-align: center;
  padding: 1rem;
`;

const SuccessModalText = styled.p`
  font-size: 1.125rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin: 1.5rem 0;
`;

const ModalButton = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1a1a1a;
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

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

    // Validate visa categories
    if (selectedVisas.length === 0) {
      errors.visaCategories = "Please select at least one visa category";
      isValid = false;
    }

    // Validate resume
    if (!resumeFile) {
      errors.resume = "Please upload your resume/CV";
      isValid = false;
    }

    // Validate help text
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
      // Create form data without the file
      const formDataWithVisas = {
        ...formState,
        visaCategories: selectedVisas,
        additionalInfo: helpText,
        // Don't include the actual file in Redux state
        resume: resumeFile ? resumeFile.name : null,
      };

      // Only create lead if we have the required fields
      if (
        formDataWithVisas.firstName &&
        formDataWithVisas.lastName &&
        formDataWithVisas.countryOfResidence
      ) {
        // Create a new lead entry
        const newLead = {
          id: uuidv4(),
          name: `${formDataWithVisas.firstName} ${formDataWithVisas.lastName}`,
          submittedAt: new Date().toISOString(),
          country: formDataWithVisas.countryOfResidence,
          status: "pending" as const,
        };

        // Add to leads table
        dispatch(addLead(newLead));
      }

      // Save form data
      dispatch(setFormData(formDataWithVisas as LeadFormData));

      // Show success modal instead of toast
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
    // Only dispatch error if we're showing validation (after submit clicked)
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
    // Only update errors if showing validation
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
    // Only update errors if showing validation
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
      <IconHeaderContainer>
        <Icon>
          <BiCube size={40} />
        </Icon>
        <SectionHeader>Want to understand your visa options?</SectionHeader>
      </IconHeaderContainer>
      <SectionDescription>
        Submit the form below and our team of experienced attorneys will review
        your information and send a preliminary assessment of your case based on
        your goals
      </SectionDescription>
      <form onSubmit={handleSubmit} noValidate>
        <JsonForms
          schema={leadFormSchema}
          uischema={uiSchema}
          data={formState}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={handleChange}
          validationMode={showValidation ? "ValidateAndShow" : "NoValidation"}
        />
        <CompactFileUploadSection>
          <CompactSectionTitle>Upload your Resume/CV</CompactSectionTitle>
          <FileUpload
            onFileChange={setResumeFile}
            hasError={showValidation && !!formErrors.resume}
            errorMessage={showValidation ? formErrors.resume : undefined}
          />
        </CompactFileUploadSection>
        <VisaCategoriesSection>
          <IconHeaderContainer>
            <Icon>
              <BiCube size={40} />
            </Icon>
            <VisaCategoriesTitle>
              Visa categories of interest?
            </VisaCategoriesTitle>
          </IconHeaderContainer>
          <CheckboxGroup>
            {visaOptions.map((option) => (
              <CheckboxLabel key={option.id}>
                <input
                  type="checkbox"
                  checked={selectedVisas.includes(option.id)}
                  onChange={() => handleVisaChange(option.id)}
                />
                {option.label}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
          {showValidation && formErrors.visaCategories && (
            <ErrorMessage>{formErrors.visaCategories}</ErrorMessage>
          )}
        </VisaCategoriesSection>
        <HelpSection>
          <IconHeaderContainer>
            <Icon>
              <FaHeart size={40} />
            </Icon>
            <VisaCategoriesTitle style={{ color: "#1a1a1a" }}>
              How can we help you?
            </VisaCategoriesTitle>
          </IconHeaderContainer>
          <TextArea
            value={helpText}
            onChange={handleHelpTextChange}
            placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long term residency?"
            hasError={showValidation && !!formErrors.helpText}
          />
          {showValidation && formErrors.helpText && (
            <ErrorMessage>{formErrors.helpText}</ErrorMessage>
          )}
          <SubmitButtonLarge type="submit">Submit</SubmitButtonLarge>
        </HelpSection>
      </form>

      <Dialog
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        PaperProps={{
          style: {
            borderRadius: "0.5rem",
            padding: "1rem",
            maxWidth: "500px",
            width: "90%",
          },
        }}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          Thank You
        </DialogTitle>
        <DialogContent>
          <SuccessModalContent>
            <SuccessModalText>
              Thank you for taking the time to fill out our form. We appreciate
              your interest and the detailed information you&apos;ve provided.
              Our team will carefully review your application and contact you
              shortly to discuss your immigration options.
            </SuccessModalText>
            <ModalButton onClick={() => setShowSuccessModal(false)}>
              Close
            </ModalButton>
          </SuccessModalContent>
        </DialogContent>
      </Dialog>
    </FormContainer>
  );
};

export default LeadForm;
