import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import toast from "react-hot-toast";

const apiClient = new APIClient("/image/upload");

export type AnalysisResponse = {
  acne_types: string[];
  recommendations: string[];
};

export const useAnalysis = () => {
  const mutation = useMutation({
    mutationFn: (file: File) => apiClient.analyzeFace(file),
    onError: (error: any) => {
      console.error(error);
      toast.error("An error occurred while analyzing the image");
    },
  });

  return { ...mutation };
}; 