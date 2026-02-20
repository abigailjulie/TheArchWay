import { useState, useEffect } from "react";
import { useAddNewClientMutation } from "../../features/clients/clientsApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { showToast } from "../../utils/showToast";
import {
  CLIENT_REGEX,
  PWD_REGEX,
  STATE_REGEX,
  PHONE_REGEX,
  EMAIL_REGEX,
} from "../../utils/regex";

export default function useNewClientForm() {
  const [addNewClient, { isLoading, isSuccess, isError, error, reset }] =
    useAddNewClientMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [roles, setRoles] = useState(["Client"]);
  const [telephone, setTelephone] = useState("");
  const [validTelephone, setValidTelephone] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [validStateCode, setValidStateCode] = useState(false);
  const [zip, setZip] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [validCompanyNumber, setValidCompanyNumber] = useState(false);

  useEffect(() => {
    setValidUsername(CLIENT_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setValidStateCode(STATE_REGEX.test(stateCode));
  }, [stateCode]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidTelephone(PHONE_REGEX.test(telephone));
  }, [telephone]);

  useEffect(() => {
    setValidCompanyNumber(PHONE_REGEX.test(companyNumber));
  }, [companyNumber]);

  const formatAddress = () => {
    const base = `${address1.trim()}`;
    const line2 = address2.trim() ? `, ${address2.trim()}` : "";
    const location = `${city.trim()}, ${stateCode.trim()} ${zip.trim()}`;
    return `${base} ${line2}, ${location}`;
  };

  const onUsernameChanged = (e) => {
    setUsername(e.target.value.trim());
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChanged = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setRoles(values);
  };

  const onCompanyNameChanged = (e) => {
    setCompanyName(e.target.value);
  };

  const onAddress1Changed = (e) => {
    setAddress1(e.target.value);
  };
  const onAddress2Changed = (e) => {
    setAddress2(e.target.value);
  };
  const onCityChanged = (e) => {
    setCity(e.target.value);
  };
  const onStateCodeChanged = (e) => {
    setStateCode(e.target.value);
  };
  const onZipChanged = (e) => {
    setZip(e.target.value);
  };

  const onCompanyNumberChanged = (e) => {
    setCompanyNumber(e.target.value);
  };

  const onTelephoneChanged = (e) => {
    setTelephone(e.target.value);
  };

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const canSave =
    [
      roles.length,
      validUsername,
      validPassword,
      validMatch,
      validEmail,
      validTelephone,
      companyName,
      address1,
      city,
      validStateCode,
      zip,
      validCompanyNumber,
    ].every(Boolean) && !isLoading;

  const onSaveClientClicked = async (e) => {
    e.preventDefault();

    if (!canSave) {
      showToast.error("Please complete all required fields before saving.", {
        toastId: "submit-client-fail",
      });
      return;
    }

    try {
      const formattedAddress = formatAddress();
      const result = await addNewClient({
        username,
        password,
        roles,
        email,
        telephone,
        company: {
          name: companyName,
          address: formattedAddress,
          telephone: companyNumber,
        },
      }).unwrap();

      showToast.success(result?.message || "Account created successfully!", {
        toastId: "registration-success",
      });

      navigate("/login");
    } catch (error) {
      const message =
        error?.data?.message || "Form is incomplete or contains invalid data.";
      showToast.error(message, { toastId: "submit-client-error" });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  return {
    state: {
      username,
      password,
      confirmPassword,
      roles,
      telephone,
      email,
      companyName,
      address1,
      address2,
      city,
      stateCode,
      zip,
      companyNumber,
      error,
      isError,
      canSave,
      options,
    },
    clicked: {
      onUsernameChanged,
      onPasswordChanged,
      onConfirmPasswordChanged,
      onRolesChanged,
      onTelephoneChanged,
      onEmailChanged,
      onCompanyNameChanged,
      onAddress1Changed,
      onAddress2Changed,
      onCityChanged,
      onStateCodeChanged,
      onZipChanged,
      onCompanyNumberChanged,
      onSaveClientClicked,
    },
    validation: {
      validUsername,
      validPassword,
      validMatch,
      validStateCode,
      validEmail,
      validTelephone,
      validCompanyNumber,
    },
  };
}
