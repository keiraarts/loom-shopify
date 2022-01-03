import React from "react";
import { render } from "@testing-library/react";
import { CountProvider } from "./app-context";

const AllTheProviders = ({ children }) => {
  return <CountProvider theme="light">{children}</CountProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
