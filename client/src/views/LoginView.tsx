import React from "react";
import LoginForm, { LoginFormData } from "../components/LoginForm/LoginForm";
import { useLoginMutation } from "../servises/queries";

const LoginView = () => {
  const loginMutation = useLoginMutation();
  const authRequest = async (data: LoginFormData) => {
    try {
      await loginMutation.mutate(data);
    } catch (e) {
      console.error(e);
    }
  };
  const onSubmit = (data: LoginFormData) => {
    authRequest(data);
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default LoginView;
