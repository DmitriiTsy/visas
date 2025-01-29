import React from "react";
import styled from "@emotion/styled";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

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

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            your interest and the detailed information you&apos;ve provided. Our
            team will carefully review your application and contact you shortly
            to discuss your immigration options.
          </SuccessModalText>
          <ModalButton onClick={onClose}>Close</ModalButton>
        </SuccessModalContent>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
