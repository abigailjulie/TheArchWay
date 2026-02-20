import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import NewClientForm from "../../../features/clients/NewClientForm";
import useAuth from "../../../hooks/useAuth";

vi.mock("../../../hooks/useAuth");

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("New client integration test", () => {
  let user;
  let mockState;
  let mockValidation;
  let mockClicked;

  beforeEach(() => {
    user = userEvent.setup({ delay: null });

    useAuth.mockReturnValue({ isFounder: false });

    mockState = {
      username: "",
      password: "",
      confirmPassword: "",
      telephone: "",
      email: "",
      companyName: "",
      companyAddress: "",
      companyNumber: "",
      address1: "",
      address2: "",
      city: "",
      stateCode: "",
      zip: "",
      roles: [],
      canSave: false,
      options: [],
      isLoading: false,
    };

    mockValidation = {
      validUsername: true,
      validPassword: true,
      validMatch: true,
      validEmail: true,
      validTelephone: true,
      validStateCode: true,
      validCompanyNumber: true,
    };

    mockClicked = {
      onUsernameChanged: vi.fn(),
      onPasswordChanged: vi.fn(),
      onConfirmPasswordChanged: vi.fn(),
      onTelephoneChanged: vi.fn(),
      onEmailChanged: vi.fn(),
      onCompanyNameChanged: vi.fn(),
      onCompanyAddressChanged: vi.fn(),
      onCompanyNumberChanged: vi.fn(),
      onAddress1Changed: vi.fn(),
      onAddress2Changed: vi.fn(),
      onCityChanged: vi.fn(),
      onStateCodeChanged: vi.fn(),
      onZipChanged: vi.fn(),
      onRolesChanged: vi.fn(),
      onSaveClientClicked: vi.fn(),
    };
  });

  describe("Happy Path", () => {
    it("should render all client info fields", () => {
      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/telephone/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    });

    it("should render all company info fields", () => {
      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(screen.getByPlaceholderText(/company name/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/street address/i),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/apartment, studio, or floor/i),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/^city$/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/^state$/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/zip code/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/company number/i),
      ).toBeInTheDocument();
    });

    it("should call handler when username is typed", async () => {
      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      const usernameInput = screen.getByPlaceholderText(/username/i);

      await user.type(usernameInput, "johndoe");

      expect(mockClicked.onUsernameChanged).toHaveBeenCalled();
    });

    it("should enable save button when canSave is true", () => {
      mockState.canSave = true;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      const saveBtn = screen.getByRole("button", {
        name: /save client/i,
      });

      expect(saveBtn).not.toBeDisabled();
    });

    it("should disable save button when cansave is false", () => {
      //canSave is false in mock state by default

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      const saveBtn = screen.getByRole("button", {
        name: /save client/i,
      });

      expect(saveBtn).toBeDisabled();
    });

    it("should call onSaveClientClicked when save button is clicked", async () => {
      mockState.canSave = true;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      const saveBtn = screen.getByRole("button", {
        name: /save client/i,
      });
      await user.click(saveBtn);

      expect(mockClicked.onSaveClientClicked).toHaveBeenCalledTimes(1);
    });
  });

  describe("Validation - Client Info", () => {
    it("should show username validation error when invalid", () => {
      mockState.username = "ab"; //Too short
      mockValidation.validUsername = false;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(
        screen.getByText(/Username must be 3-20 characters/i),
      ).toBeInTheDocument();
    });

    it("should show password validation error when invalid", () => {
      mockState.password = "123"; //Too short
      mockValidation.validPassword = false;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(screen.getByText(/Password must/i)).toBeInTheDocument();
    });

    it("should show password match error when passwords don't match", () => {
      mockState.password = "ValidPassword123!";
      mockState.confirmPassword = "DifferentPassword123!";
      mockValidation.validPassword = true;
      mockValidation.validMatch = false;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      const confirmPasswordInput =
        screen.getByPlaceholderText(/confirm password/i);

      expect(confirmPasswordInput).toHaveClass("is-invalid");
      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
    });

    it("should show telephone validation error when invalid", () => {
      mockState.telephone = "123456"; //Wrong Format
      mockValidation.validTelephone = false;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      const telephoneInput = screen.getByPlaceholderText(/telephone/i);
      expect(telephoneInput).toHaveClass("is-invalid");

      const errors = screen.getAllByText(
        /Enter a valid phone number in the format 123-456-7890/i,
      );
      expect(errors.length).toBeGreaterThan(0);
    });

    it("should show email validation error when invalid", () => {
      mockState.email = "not-an-email";
      mockValidation.validEmail = false;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(
        screen.getByText(/please enter a valid email address/i),
      ).toBeInTheDocument();
    });
  });

  describe("Validation - Company Info", () => {
    it("should show state validation error when invalid", () => {
      mockState.stateCode = "USA"; //should be two captial letters
      mockValidation.validStateCode = false;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(
        screen.getByText(
          /Please enter a valid 2-letter U.S. state abbreviation/i,
        ),
      ).toBeInTheDocument();
    });

    it("should show company number validation error when invalid", () => {
      mockState.companyNumber = "123456"; //Wrong format
      mockValidation.validCompanyNumber = false;

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      const errors = screen.getAllByText(
        /Enter a valid phone number in the format 123-456-7890/i,
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe("Role Selection - Founder Only", () => {
    it("should not show role selector when user is not Founder", () => {
      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(screen.queryByLabelText(/select role/i)).not.toBeInTheDocument();
    });

    it("should show role selector when user is Founder", () => {
      useAuth.mockReturnValue({ isFounder: true });

      mockState.options = [
        <option key="1" value="Admin">
          Admin
        </option>,
        <option key="2" value="Client">
          Client
        </option>,
      ];

      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      expect(screen.queryByLabelText(/select role/i)).toBeInTheDocument();
    });
  });

  describe("User Interaction Flow", () => {
    it("should call all handlers when filling out complete form", async () => {
      renderWithRouter(
        <NewClientForm
          state={mockState}
          validation={mockValidation}
          clicked={mockClicked}
        />,
      );

      await user.type(screen.getByPlaceholderText(/username/i), "johndoe");
      await user.type(screen.getByPlaceholderText(/^password$/i), "john123");
      await user.type(
        screen.getByPlaceholderText(/telephone/i),
        "123-456-7890",
      );
      await user.type(screen.getByPlaceholderText(/email/i), "john@gmail.com");

      await user.type(
        screen.getByPlaceholderText(/company name/i),
        "John Doe LLC",
      );
      await user.type(
        screen.getByPlaceholderText(/street address/i),
        "123 Red Road",
      );
      await user.type(screen.getByPlaceholderText(/^city$/i), "New York");
      await user.type(screen.getByPlaceholderText(/^state$/i), "NY");
      await user.type(screen.getByPlaceholderText(/zip code/i), "10010");
      await user.type(
        screen.getByPlaceholderText(/company number/i),
        "555-123-5896",
      );

      expect(mockClicked.onUsernameChanged).toHaveBeenCalled();
      expect(mockClicked.onPasswordChanged).toHaveBeenCalled();
      expect(mockClicked.onTelephoneChanged).toHaveBeenCalled();
      expect(mockClicked.onEmailChanged).toHaveBeenCalled();
      expect(mockClicked.onCompanyNameChanged).toHaveBeenCalled();
      expect(mockClicked.onAddress1Changed).toHaveBeenCalled();
      expect(mockClicked.onCityChanged).toHaveBeenCalled();
      expect(mockClicked.onStateCodeChanged).toHaveBeenCalled();
      expect(mockClicked.onZipChanged).toHaveBeenCalled();
      expect(mockClicked.onCompanyNumberChanged).toHaveBeenCalled();
    });
  });
});
