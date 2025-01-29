import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

const DropzoneContainer = styled.div<{
  isDragActive: boolean;
  hasError?: boolean;
}>`
  border: 2px dashed
    ${(props) =>
      props.hasError ? "#dc2626" : props.isDragActive ? "#2563eb" : "#e5e7eb"};
  background-color: ${(props) =>
    props.hasError
      ? "rgba(220, 38, 38, 0.05)"
      : props.isDragActive
      ? "rgba(37, 99, 235, 0.05)"
      : "white"};
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => (props.hasError ? "#dc2626" : "#2563eb")};
    background-color: ${(props) =>
      props.hasError ? "rgba(220, 38, 38, 0.05)" : "rgba(37, 99, 235, 0.05)"};
  }
`;

const UploadIcon = styled.div`
  color: #2563eb;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const UploadText = styled.div`
  color: #4b5563;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const UploadHint = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1f2937;
  font-size: 0.875rem;
`;

const FileIcon = styled.div`
  color: #2563eb;
`;

const RemoveButton = styled.button`
  color: #6b7280;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: #dc2626;
    background-color: rgba(220, 38, 38, 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
`;

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  hasError?: boolean;
  errorMessage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  hasError,
  errorMessage,
}) => {
  const [file, setFile] = React.useState<File | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        onFileChange(selectedFile);
      }
    },
    [onFileChange]
  );

  const removeFile = React.useCallback(() => {
    setFile(null);
    onFileChange(null);
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      <DropzoneContainer
        {...getRootProps()}
        isDragActive={isDragActive}
        hasError={hasError}
      >
        <input {...getInputProps()} />
        {!file && (
          <>
            <UploadIcon>
              <FiUploadCloud />
            </UploadIcon>
            <UploadText>
              {isDragActive
                ? "Drop your file here"
                : "Drag and drop your resume/CV here"}
            </UploadText>
            <UploadHint>
              or click to select (PDF, DOC, DOCX up to 10MB)
            </UploadHint>
          </>
        )}
        {file && (
          <FilePreview>
            <FileInfo>
              <FileIcon>
                <FiFile />
              </FileIcon>
              <div>
                <div>{file.name}</div>
                <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  {formatFileSize(file.size)}
                </div>
              </div>
            </FileInfo>
            <RemoveButton
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              <FiX />
            </RemoveButton>
          </FilePreview>
        )}
      </DropzoneContainer>
      {hasError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default FileUpload;
