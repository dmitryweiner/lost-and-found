import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm, { LoginFormData } from "../components/LoginForm/LoginForm";
import { API } from "../servises/api";
import toast from "react-hot-toast";

const LoginView = () => {
  const navigate = useNavigate();
  const authRequest = async (data: LoginFormData) => {
    try {
      await API.auth.login(data);
      toast.success("User successfully logged in.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = (data: LoginFormData) => {
    authRequest(data);
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit}/>
    </div>
  );
};

export default LoginView;
