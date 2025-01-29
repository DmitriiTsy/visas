import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LeadForm from "../components/LeadForm";
import leadsReducer from "../store/leadsSlice";

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: {
      leads: leadsReducer,
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe("LeadForm Component", () => {
  it("should show validation error for invalid email", async () => {
    renderWithRedux(<LeadForm />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    const errorMessage = await screen.findByText(
      "Please enter a valid email address"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should not submit form with empty required fields", async () => {
    renderWithRedux(<LeadForm />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    const nameError = await screen.findByText("Name is required");
    const emailError = await screen.findByText("Email is required");

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
  });
});
