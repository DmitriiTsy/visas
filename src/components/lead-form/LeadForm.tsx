import React from "react";
import { FormContainer } from "./styles";
import FormHeader from "./FormHeader";
import BasicInfoForm from "./BasicInfoForm";
import ResumeUploadSection from "./ResumeUploadSection";
import VisaCategoriesSection from "./VisaCategoriesSection";
import HelpSection from "./HelpSection";
import SuccessModal from "./SuccessModal";
import { useLeadForm } from "./hooks/useLeadForm";

const LeadForm: React.FC = () => {
  const {
    formState,
    selectedVisas,
    helpText,
    formErrors,
    showValidation,
    showSuccessModal,
    setShowSuccessModal,
    setResumeFile,
    handleSubmit,
    handleChange,
    handleVisaChange,
    handleHelpTextChange,
  } = useLeadForm();

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
