import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/useAuthStore";
import APIClient from "../services/api-client";
import { useNavigate } from "react-router";
import type { LoginFormData } from "../components/Auth/Login";
import toast from "react-hot-toast";

const apiClient = new APIClient("/login");

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => apiClient.login(data),
    onError: (error: any) => {
      console.log(error);
      toast.error("An error occurred during authentication");
    },
    onSuccess: (data) => {
      const userData: any = data;
      localStorage.setItem("loginMethod", userData.loginMethod);
      toast.success("Authentication successful");
      useAuthStore.getState().setUser(data);
      navigate("/");
    },
  });
  const handleLogout = () => {
    useAuthStore.getState().clearUser();
    localStorage.removeItem("loginMethod");
    navigate("/login");
  };

  return { ...mutation, handleLogout };
};
