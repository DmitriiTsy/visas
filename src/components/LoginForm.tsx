"use client";

import React from "react";
import styled from "@emotion/styled";
import { useAuth } from "../context/AuthContext";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

interface FormData {
  username?: string;
  password?: string;
}

const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 3,
    },
    password: {
      type: "string",
      minLength: 3,
    },
  },
  required: ["username", "password"],
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/username",
      label: "Username",
      options: {
        placeholder: "Enter your username",
      },
    },
    {
      type: "Control",
      scope: "#/properties/password",
      label: "Password",
      options: {
        placeholder: "Enter your password",
        format: "password",
      },
    },
  ],
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({});
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;

    try {
      await login(formData.username, formData.password);
    } catch {
      // Error is handled by the AuthContext
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>Login to Dashboard</LoginTitle>
      <form onSubmit={handleSubmit}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setFormData(data)}
        />
        <LoginButton
          type="submit"
          disabled={!formData.username || !formData.password}
        >
          Login
        </LoginButton>
      </form>
    </LoginContainer>
  );
};

export default LoginForm;
