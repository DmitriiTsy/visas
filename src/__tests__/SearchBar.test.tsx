import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SearchBar } from "../components/SearchBar";

describe("SearchBar Component", () => {
  it("should update input value when user types", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search leads...");
    fireEvent.change(input, { target: { value: "John" } });

    expect(input.value).toBe("John");
  });

  it("should call onSearch with debounce when user types", async () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();

    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search leads...");

    fireEvent.change(input, { target: { value: "John" } });
    jest.advanceTimersByTime(300); // Debounce time

    expect(onSearch).toHaveBeenCalledWith("John");
    jest.useRealTimers();
  });
});
