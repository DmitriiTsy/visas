"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../components/LoginForm";

const LoginContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f3f4f6;
`;

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
