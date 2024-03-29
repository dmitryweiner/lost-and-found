import React from "react";
import RegistrationForm, {
  RegistrationFormData
} from "../components/RegistrationForm/RegistrationForm";
import { useRegisterMutation } from "../servises/queries";

const RegistrationView = () => {
  const registerMutation = useRegisterMutation();

  const registrationRequest = async (data: RegistrationFormData) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (e) {
      console.error(e);
    }
  };
  const onSubmit = (data: RegistrationFormData) => {
    registrationRequest(data);
  };

  return <RegistrationForm onSubmit={onSubmit} />;
};

export default RegistrationView;
