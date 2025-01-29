import React from "react";
import styled from "@emotion/styled";
import FileUpload from "../FileUpload";

const UploadContainer = styled.div`
  margin: 2rem auto;
  max-width: 800px;
`;

const UploadTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
`;

interface ResumeUploadSectionProps {
  onFileChange: (file: File | null) => void;
  hasError: boolean;
  errorMessage?: string;
}

const ResumeUploadSection: React.FC<ResumeUploadSectionProps> = ({
  onFileChange,
  hasError,
  errorMessage,
}) => {
  return (
    <UploadContainer>
      <UploadTitle>Upload your Resume/CV</UploadTitle>
      <FileUpload
        onFileChange={onFileChange}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    </UploadContainer>
  );
};

export default ResumeUploadSection;
