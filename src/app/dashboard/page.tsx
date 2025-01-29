"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { useAuth } from "../../context/AuthContext";
import {
  FiSettings,
  FiUsers,
  FiUser,
  FiSearch,
  FiArrowUp,
  FiArrowDown,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiBarChart2,
  FiFileText,
  FiBell,
  FiTrendingUp,
  FiLayers,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Lead, updateLead, reloadLeads } from "../../store/leadsSlice";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface SortConfig {
  key: keyof Lead;
  direction: "asc" | "desc";
}

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: 1024px) {
    width: 240px;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
    position: relative;
    height: auto;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-x: auto;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavSection = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 1rem;

  @media (max-width: 768px) {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    overflow-y: visible;
  }

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
`;

const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  color: ${(props) => (props.active ? "#2563eb" : "#4b5563")};
  background-color: ${(props) => (props.active ? "#eff6ff" : "transparent")};
  transition: all 0.2s;

  &:hover {
    background-color: #eff6ff;
    color: #2563eb;
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
    flex: 1;
    justify-content: center;

    svg {
      margin-right: 0.5rem;
      font-size: 1.125rem;
    }
  }
`;

const AdminSection = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  transition: all 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
    color: #2563eb;
  }

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  span {
    font-weight: 600;
  }
`;

const TableSection = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 0;
    box-shadow: none;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const TableTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 400px;
  transition: all 0.2s;

  &:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    max-width: none;
  }

  svg {
    color: #6b7280;
    margin-right: 0.5rem;
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    color: #1a1a1a;
    font-size: 0.875rem;

    &::placeholder {
      color: #6b7280;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: #6b7280;
  font-weight: 500;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  padding-right: 2.5rem;
  white-space: nowrap;
  user-select: none;

  &:hover {
    color: #2563eb;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    padding-right: 2.5rem;
    font-size: 0.875rem;
  }
`;

const SortIconWrapper = styled.div<{ active?: boolean }>`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.active ? "#2563eb" : "#9ca3af")};
  width: 12px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #1a1a1a;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  ${(props) => {
    switch (props.status) {
      case "pending":
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
      case "REACHED_OUT":
        return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
      case "approved":
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case "rejected":
        return `
          background-color: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #4b5563;
        `;
    }
  }}

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -1.5rem;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: 0.75rem;
  border-radius: 0.375rem;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: #eff6ff;

    svg {
      transform: rotate(180deg);
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #bfdbfe;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
  }
`;

const StatusCell = styled.div`
  display: flex;
  align-items: center;
`;

const ModalContent = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ModalButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.variant === "primary"
      ? `
    background-color: #2563eb;
    color: white;
    &:hover {
      background-color: #1d4ed8;
    }
  `
      : `
    background-color: #f3f4f6;
    color: #4b5563;
    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => (props.active ? "#2563eb" : "#e5e7eb")};
  background-color: ${(props) => (props.active ? "#2563eb" : "white")};
  color: ${(props) => (props.active ? "white" : "#4b5563")};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    color: ${(props) => (props.active ? "white" : "#2563eb")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    &:hover {
      border-color: #e5e7eb;
      color: #4b5563;
    }
  }
`;

const WorkInProgressModal = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 1rem;
    padding: 2rem;
    max-width: 400px;
    text-align: center;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
`;

const FeatureDescription = styled.p`
  color: #4b5563;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
`;

const FeatureIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    width: 48px;
    height: 48px;
    color: #2563eb;
  }
`;

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState("leads");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "submittedAt",
    direction: "desc",
  });
  const dispatch = useDispatch();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 8;
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<{
    title: string;
    icon: React.ReactNode;
    description: string;
  } | null>(null);

  const leads = useSelector((state: RootState) => state.leads.leads);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      dispatch(reloadLeads());
    }
  }, [isAuthenticated, router, dispatch]);

  const handleSort = (key: keyof Lead) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const sortedLeads = React.useMemo(() => {
    const sorted = [...leads].sort((a, b) => {
      if (sortConfig.key === "submittedAt") {
        return sortConfig.direction === "asc"
          ? new Date(a[sortConfig.key]).getTime() -
              new Date(b[sortConfig.key]).getTime()
          : new Date(b[sortConfig.key]).getTime() -
              new Date(a[sortConfig.key]).getTime();
      }
      return sortConfig.direction === "asc"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });

    if (searchTerm) {
      return sorted.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return sorted;
  }, [leads, sortConfig, searchTerm]);

  const paginatedLeads = React.useMemo(() => {
    const startIndex = (currentPage - 1) * leadsPerPage;
    return sortedLeads.slice(startIndex, startIndex + leadsPerPage);
  }, [sortedLeads, currentPage]);

  const totalPages = Math.ceil(sortedLeads.length / leadsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedLead) {
      dispatch(
        updateLead({
          ...selectedLead,
          status: "REACHED_OUT",
        })
      );
    }
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleFeatureClick = (feature: {
    title: string;
    icon: React.ReactNode;
    description: string;
  }) => {
    setSelectedFeature(feature);
    setIsFeatureModalOpen(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  const SortIcon = ({ columnKey }: { columnKey: keyof Lead }) => {
    const isActive = sortConfig.key === columnKey;
    return (
      <SortIconWrapper active={isActive}>
        <FiArrowUp
          size={12}
          style={{
            opacity: isActive && sortConfig.direction === "asc" ? 1 : 0.3,
            marginBottom: -2,
            position: "absolute",
            top: 2,
          }}
        />
        <FiArrowDown
          size={12}
          style={{
            opacity: isActive && sortConfig.direction === "desc" ? 1 : 0.3,
            position: "absolute",
            bottom: 2,
          }}
        />
      </SortIconWrapper>
    );
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <NavSection>
          <NavItem
            active={activeSection === "leads"}
            onClick={() => setActiveSection("leads")}
          >
            <FiUsers />
            Leads
          </NavItem>
          <NavItem
            onClick={() =>
              handleFeatureClick({
                title: "Analytics",
                icon: <FiBarChart2 />,
                description:
                  "Advanced analytics and reporting features are coming soon! Track lead conversion rates, analyze trends, and gain valuable insights into your immigration case pipeline.",
              })
            }
          >
            <FiBarChart2 />
            Analytics
          </NavItem>
          <NavItem
            onClick={() =>
              handleFeatureClick({
                title: "Documents",
                icon: <FiFileText />,
                description:
                  "Document management system is under development. Soon you'll be able to store, organize, and track all immigration-related documents in one place.",
              })
            }
          >
            <FiFileText />
            Documents
          </NavItem>
          <NavItem
            onClick={() =>
              handleFeatureClick({
                title: "Notifications",
                icon: <FiBell />,
                description:
                  "Stay updated with real-time notifications about case status changes, deadlines, and important updates. This feature is coming in the next release.",
              })
            }
          >
            <FiBell />
            Notifications
          </NavItem>
          <NavItem
            onClick={() =>
              handleFeatureClick({
                title: "Performance",
                icon: <FiTrendingUp />,
                description:
                  "Track your case processing efficiency, response times, and success rates. Performance metrics dashboard is currently in development.",
              })
            }
          >
            <FiTrendingUp />
            Performance
          </NavItem>
          <NavItem
            onClick={() =>
              handleFeatureClick({
                title: "Settings",
                icon: <FiSettings />,
                description:
                  "Customize your workspace, manage user preferences, and configure system settings. This feature will be available soon.",
              })
            }
          >
            <FiSettings />
            Settings
          </NavItem>
          <NavItem
            onClick={() =>
              handleFeatureClick({
                title: "Integration",
                icon: <FiLayers />,
                description:
                  "Connect with other tools and services to streamline your immigration case management workflow. Integration features are being developed.",
              })
            }
          >
            <FiLayers />
            Integration
          </NavItem>
        </NavSection>

        <AdminSection>
          <FiUser size={20} />
          <span>Admin</span>
        </AdminSection>
      </Sidebar>

      <MainContent>
        <TableSection>
          <TableHeader>
            <TableTitle>Leads</TableTitle>
          </TableHeader>

          <SearchBar>
            <FiSearch />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th onClick={() => handleSort("name")}>
                    Name <SortIcon columnKey="name" />
                  </Th>
                  <Th onClick={() => handleSort("submittedAt")}>
                    Submitted <SortIcon columnKey="submittedAt" />
                  </Th>
                  <Th onClick={() => handleSort("status")}>
                    Status <SortIcon columnKey="status" />
                  </Th>
                  <Th onClick={() => handleSort("country")}>
                    Country <SortIcon columnKey="country" />
                  </Th>
                </tr>
              </thead>
              <tbody>
                {sortedLeads.length === 0 ? (
                  <tr>
                    <Td colSpan={4} style={{ textAlign: "center" }}>
                      No leads submitted yet
                    </Td>
                  </tr>
                ) : (
                  paginatedLeads.map((lead) => (
                    <tr key={lead.id}>
                      <Td>{lead.name}</Td>
                      <Td>{new Date(lead.submittedAt).toLocaleDateString()}</Td>
                      <Td>
                        <StatusCell>
                          <StatusBadge status={lead.status}>
                            {lead.status}
                          </StatusBadge>
                          {lead.status === "pending" && (
                            <ActionButton
                              onClick={() => handleStatusChange(lead)}
                              title="Change status to reached out"
                            >
                              <FiRefreshCw />
                            </ActionButton>
                          )}
                        </StatusCell>
                      </Td>
                      <Td>{lead.country}</Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </TableWrapper>

          {sortedLeads.length > 0 && (
            <PaginationContainer>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </PageButton>

              {currentPage > 1 && (
                <PageButton onClick={() => handlePageChange(currentPage - 1)}>
                  {currentPage - 1}
                </PageButton>
              )}

              <PageButton active>{currentPage}</PageButton>

              {currentPage < totalPages && (
                <PageButton onClick={() => handlePageChange(currentPage + 1)}>
                  {currentPage + 1}
                </PageButton>
              )}

              <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FiChevronRight />
              </PageButton>
            </PaginationContainer>
          )}
        </TableSection>
      </MainContent>

      <WorkInProgressModal
        open={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
      >
        <DialogContent>
          {selectedFeature && (
            <>
              <FeatureIcon>{selectedFeature.icon}</FeatureIcon>
              <FeatureTitle>{selectedFeature.title}</FeatureTitle>
              <FeatureDescription>
                {selectedFeature.description}
              </FeatureDescription>
              <ModalButton
                variant="primary"
                onClick={() => setIsFeatureModalOpen(false)}
              >
                Got it
              </ModalButton>
            </>
          )}
        </DialogContent>
      </WorkInProgressModal>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        PaperProps={{
          style: {
            borderRadius: "0.5rem",
            padding: "1rem",
          },
        }}
      >
        <DialogTitle
          style={{ textAlign: "center", fontSize: "1.25rem", fontWeight: 600 }}
        >
          Confirm Status Change
        </DialogTitle>
        <DialogContent>
          <ModalContent>
            <p>Are you sure you want to change the status of this lead?</p>
            <ButtonGroup>
              <ModalButton
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleConfirmStatusChange}
              >
                Yes
              </ModalButton>
            </ButtonGroup>
          </ModalContent>
        </DialogContent>
      </Dialog>
    </DashboardContainer>
  );
};

export default Dashboard;
