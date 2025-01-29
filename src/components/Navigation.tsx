import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const NavContainer = styled.nav`
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled.a<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: ${(props) => (props.active ? "white" : "#4b5563")};
  background-color: ${(props) => (props.active ? "#2563eb" : "transparent")};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#1d4ed8" : "#f3f4f6")};
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #dc2626;
  background-color: transparent;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #fee2e2;
  }
`;

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  return (
    <NavContainer>
      <NavContent>
        <Logo>ALMA</Logo>
        <NavLinks>
          <Link href="/" passHref legacyBehavior>
            <NavLink active={pathname === "/"}>Landing</NavLink>
          </Link>
          <Link href="/dashboard" passHref legacyBehavior>
            <NavLink active={pathname === "/dashboard"}>Dashboard</NavLink>
          </Link>
          {isAuthenticated && (
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          )}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation;
