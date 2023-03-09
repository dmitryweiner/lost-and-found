import React from 'react';
import { useNavigate } from "react-router-dom";
import RegistrationForm, { RegistrationFormData } from "../components/RegistrationForm/RegistrationForm";
import { API } from "../servises/api";
import toast from "react-hot-toast";

const RegistrationView = () => {
  const navigate = useNavigate();

  const registrationRequest = async (data: RegistrationFormData) => {
    try {
      await API.user.register(data);
      toast.success("User successfully created.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };
  const onSubmit = (data: RegistrationFormData) => {
    registrationRequest(data);
  };

  return <RegistrationForm onSubmit={onSubmit}/>;
};

export default RegistrationView;
