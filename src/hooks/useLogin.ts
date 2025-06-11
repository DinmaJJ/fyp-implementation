import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/useAuthStore";
import APIClient from "../services/api-client";
import { useNavigate } from "react-router";
import type { LoginFormData } from "../components/Auth/Login";
import toast from "react-hot-toast";

const apiClient = new APIClient("/auth/login");

interface LoginResponse {
  user: LoginFormData;
  isAuthenticated: boolean;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setAuthenticated } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => apiClient.login(data),
    onError: (error: any) => {
      console.log(error);
      toast.error("An error occurred during authentication");
    },
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      setAuthenticated(data.isAuthenticated);
      toast.success("Authentication successful");
      navigate("/");
    },
  });

  const handleLogout = () => {
    useAuthStore.getState().clearUser();
    navigate("/login");
  };

  return { ...mutation, handleLogout };
};
