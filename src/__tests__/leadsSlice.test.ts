import { configureStore } from "@reduxjs/toolkit";
import leadsReducer, {
  addLead,
  updateLead,
  setLeads,
} from "../store/leadsSlice";

describe("leads slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        leads: leadsReducer,
      },
    });
  });

  it("should handle adding a new lead", () => {
    const newLead = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "new",
      submissionDate: "2024-03-20",
    };

    store.dispatch(addLead(newLead));
    const state = store.getState().leads;

    expect(state.leads).toHaveLength(1);
    expect(state.leads[0]).toEqual(newLead);
  });

  it("should handle updating a lead status", () => {
    const lead = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "new",
      submissionDate: "2024-03-20",
    };

    store.dispatch(addLead(lead));
    store.dispatch(updateLead({ id: "1", status: "reached_out" }));

    const state = store.getState().leads;
    expect(state.leads[0].status).toBe("reached_out");
  });

  it("should handle setting multiple leads", () => {
    const leads = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        status: "new",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        status: "reached_out",
      },
    ];

    store.dispatch(setLeads(leads));
    const state = store.getState().leads;

    expect(state.leads).toHaveLength(2);
    expect(state.leads).toEqual(leads);
  });
});
