import axios from "axios";
import type { LoginFormData } from "../components/Auth/Login";
import type { SignupData } from "../components/Auth/Signup";

export interface PredictData {
  prediction: string;
  confidence_scores: ConfidenceScores;
  frames: number;
}

export interface ConfidenceScores {
  distracted: number;
  focused: number;
}

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

class APIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async login(data: LoginFormData) {
    return await axiosInstance
      .post(this.endpoint, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }

  async register(data: SignupData) {
    return await axiosInstance
      .post(this.endpoint, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }

  async analyzeFace(file: File) {
    const formData = new FormData();
    formData.append("video", file);

    return await axiosInstance
      .post<PredictData>(`${this.endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          throw new Error("An error occurred while processing uploaded video");
        }
        throw err;
      });
  }
}

export default APIClient;
