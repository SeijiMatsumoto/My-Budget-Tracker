import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";

test("renders text on the page", () => {
  render(<Home />);
  const textElement = screen.getByText("Hello");
  expect(textElement).toBeInTheDocument();
});
