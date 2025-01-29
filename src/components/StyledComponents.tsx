import styled from "@emotion/styled";

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    margin: 1.5rem auto;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 0;
    box-shadow: none;
  }

  /* Cross-browser form styles */
  input,
  select,
  textarea,
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: inherit;
  }

  /* Ensure proper rendering in Safari */
  input[type="date"],
  input[type="time"],
  input[type="datetime-local"] {
    -webkit-appearance: textfield;
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  /* Ensure proper text rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Disable text selection for buttons */
  button {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Fix for iOS input shadows */
  input[type="text"],
  input[type="email"],
  input[type="url"],
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /* Ensure proper box-sizing */
  * {
    box-sizing: border-box;
  }
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

export const SubmitButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #0051cc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: #ff0000;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;
