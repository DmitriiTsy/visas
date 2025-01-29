import React from "react";
import styled from "@emotion/styled";
import { FaHeart } from "react-icons/fa";
import { IconHeaderContainer, Icon, SubmitButtonLarge } from "./styles";

const HelpSectionContainer = styled.div`
  margin: 3rem auto;
  max-width: 800px;
  text-align: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 2rem auto;
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

interface HelpSectionProps {
  helpText: string;
  onHelpTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  showValidation: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const HelpSection: React.FC<HelpSectionProps> = ({
  helpText,
  onHelpTextChange,
  error,
  showValidation,
  onSubmit,
}) => {
  return (
    <HelpSectionContainer>
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
        onChange={onHelpTextChange}
        placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long term residency?"
        hasError={showValidation && !!error}
      />
      {showValidation && error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButtonLarge onClick={onSubmit}>Submit</SubmitButtonLarge>
    </HelpSectionContainer>
  );
};

export default HelpSection;
