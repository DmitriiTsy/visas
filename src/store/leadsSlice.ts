import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Lead {
  id: string;
  name: string;
  submittedAt: string;
  country: string;
  status: "pending" | "REACHED_OUT" | "approved" | "rejected";
}

interface LeadsState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

// Generate dummy data
const generateDummyData = (): Lead[] => {
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "Brazil",
    "India",
    "Spain",
  ];
  const statuses: Lead["status"][] = [
    "pending",
    "REACHED_OUT",
    "approved",
    "rejected",
  ];
  const firstNames = [
    "John",
    "Emma",
    "Michael",
    "Sophia",
    "William",
    "Olivia",
    "James",
    "Ava",
    "Alexander",
    "Isabella",
    "Daniel",
    "Mia",
    "David",
    "Charlotte",
    "Joseph",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Davis",
    "Wilson",
    "Anderson",
    "Taylor",
    "Thomas",
    "Moore",
    "Martin",
    "Lee",
    "Thompson",
    "White",
    "Harris",
    "Clark",
  ];

  return Array.from({ length: 30 }, (_, index) => ({
    id: (index + 1).toString(),
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,
    submittedAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    country: countries[Math.floor(Math.random() * countries.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

// Load initial state from localStorage
const loadState = (): LeadsState => {
  try {
    const serializedState = localStorage.getItem("leads");
    if (serializedState === null) {
      // Return dummy data if no data in localStorage
      return {
        leads: generateDummyData(),
        loading: false,
        error: null,
      };
    }
    const parsedState = JSON.parse(serializedState);

    // Only use dummy data if there are no leads at all
    if (parsedState.leads.length === 0) {
      parsedState.leads = generateDummyData();
      localStorage.setItem("leads", JSON.stringify(parsedState));
    }

    return parsedState;
  } catch {
    return {
      leads: generateDummyData(),
      loading: false,
      error: null,
    };
  }
};

const initialState: LeadsState = loadState();

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
      localStorage.setItem("leads", JSON.stringify({ ...state }));
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      // Add new leads at the beginning of the array
      state.leads.unshift(action.payload);
      localStorage.setItem("leads", JSON.stringify({ ...state }));
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex(
        (lead) => lead.id === action.payload.id
      );
      if (index !== -1) {
        state.leads[index] = action.payload;
        localStorage.setItem("leads", JSON.stringify({ ...state }));
      }
    },
    reloadLeads: (state) => {
      const newState = loadState();
      state.leads = newState.leads;
      localStorage.setItem("leads", JSON.stringify({ ...state }));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      localStorage.setItem("leads", JSON.stringify({ ...state }));
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      localStorage.setItem("leads", JSON.stringify({ ...state }));
    },
  },
});

export const {
  setLeads,
  addLead,
  updateLead,
  reloadLeads,
  setLoading,
  setError,
} = leadsSlice.actions;
export default leadsSlice.reducer;
