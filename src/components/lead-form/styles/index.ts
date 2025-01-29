import styled from "@emotion/styled";

export const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const SectionHeader = styled.h2`
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

export const SectionDescription = styled.p`
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

export const IconHeaderContainer = styled.div`
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

export const Icon = styled.div`
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

export const SubmitButtonLarge = styled.button`
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
