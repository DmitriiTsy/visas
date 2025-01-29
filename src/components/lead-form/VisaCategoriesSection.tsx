import React from "react";
import styled from "@emotion/styled";
import { BiCube } from "react-icons/bi";
import { IconHeaderContainer, Icon } from "./styles";

const VisaCategoriesSectionContainer = styled.div`
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

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
`;

export const visaOptions = [
  { id: "o1", label: "O1" },
  { id: "eb1a", label: "EB-1A" },
  { id: "eb2niw", label: "EB-2 NIW" },
  { id: "unknown", label: "I Don't Know" },
];

interface VisaCategoriesSectionProps {
  selectedVisas: string[];
  onVisaChange: (visaId: string) => void;
  error?: string;
  showValidation: boolean;
}

const VisaCategoriesSection: React.FC<VisaCategoriesSectionProps> = ({
  selectedVisas,
  onVisaChange,
  error,
  showValidation,
}) => {
  return (
    <VisaCategoriesSectionContainer>
      <IconHeaderContainer>
        <Icon>
          <BiCube size={40} />
        </Icon>
        <VisaCategoriesTitle>Visa categories of interest?</VisaCategoriesTitle>
      </IconHeaderContainer>
      <CheckboxGroup>
        {visaOptions.map((option) => (
          <CheckboxLabel key={option.id}>
            <input
              type="checkbox"
              checked={selectedVisas.includes(option.id)}
              onChange={() => onVisaChange(option.id)}
            />
            {option.label}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>
      {showValidation && error && <ErrorMessage>{error}</ErrorMessage>}
    </VisaCategoriesSectionContainer>
  );
};

export default VisaCategoriesSection;
