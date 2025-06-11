import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import APIClient from "../services/api-client";
import type { SignupData } from "../components/Auth/Signup";
import toast from "react-hot-toast";

const apiClient = new APIClient("/auth/signup");

export const useRegister = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: SignupData) => apiClient.register(data),
    onError: (error: any) => {
      console.log(error);
      toast.error("An error occurred during registration");
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("You have been registered!!");
      navigate("/login");
    },
  });

  return { ...mutation };
};
