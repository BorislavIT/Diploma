import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastProvider } from "@/contexts/ToastContext";
import NewInvestmentDialog from "./NewInvestmentDialog";

jest.mock("@/shared/apiUtils", () => ({
  ...jest.requireActual("@/shared/apiUtils"),
  default: jest.fn().mockImplementation((url, method) => {
    if (url === "/investments" && method === "POST") {
      return Promise.resolve("boba");
    }

    if (url === "/investments" && method === "GET") {
      return Promise.resolve("boba1");
    }
  }),
  __esModule: true,
}));

describe("NewInvestmentDialog", () => {
  beforeAll(() => {
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when dialog is visible", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ToastProvider>
            <NewInvestmentDialog
              isVisible={true}
              setIsCreationModalVisible={jest.fn()}
            />
          </ToastProvider>
        </Provider>
      );
    });

    test("shows an the success toast when form is successfully submited", async () => {
      const nameField = screen.getByLabelText(/Name/i);
      const typeField = screen.getByLabelText(/Type/i);
      const valueField = screen.getByLabelText(/Value/i);
      const createButton = screen.getByRole("button", { name: /Create/i });

      fireEvent.change(nameField, { target: { value: "aaa" } });
      fireEvent.change(typeField, { target: { value: "Test Type" } });
      fireEvent.change(valueField, { target: { value: "2" } });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(
          screen.queryByText("Investment created successfully!")
        ).toBeInTheDocument();
      });
    });

    test("renders form fields correctly", () => {
      const nameField = screen.getByLabelText(/Name/i);
      const typeField = screen.getByLabelText(/Type/i);
      const valueField = screen.getByLabelText(/Value/i);

      expect(nameField).toBeInTheDocument();
      expect(typeField).toBeInTheDocument();
      expect(valueField).toBeInTheDocument();
    });

    test("disables Create button when form is submitting", async () => {
      const createButton = screen.getByRole("button", { name: /Create/i });

      fireEvent.click(createButton);

      expect(createButton).toBeDisabled();
    });

    test("shows an error message with invalid data", async () => {
      const nameField = screen.getByLabelText(/Name/i);
      const typeField = screen.getByLabelText(/Type/i);
      const valueField = screen.getByLabelText(/Value/i);
      const createButton = screen.getByRole("button", { name: /Create/i });

      fireEvent.change(nameField, { target: { value: "aa" } });
      fireEvent.change(typeField, { target: { value: "Test Type" } });
      fireEvent.change(valueField, { target: { value: "0" } });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(
          screen.queryByText("Name should contain at least 3 characters")
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Value must be greater than 0")
        ).toBeInTheDocument();
      });
    });
  });

  describe("when dialog is not visible", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <NewInvestmentDialog
            isVisible={false}
            setIsCreationModalVisible={jest.fn()}
          />
        </Provider>
      );
    });

    test("does not render New Investment dialog when not visible", () => {
      const dialogElement = screen.queryByText(/New Investment/i);
      expect(dialogElement).not.toBeInTheDocument();
    });
  });
});
