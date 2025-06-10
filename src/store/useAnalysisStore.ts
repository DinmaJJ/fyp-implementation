import { create } from "zustand";

export type AnalysisResult = {
  acneType: string;
  products: string[];
};

type Store = {
  uploadedImage: string | null;
  analysisResult: AnalysisResult | null;
  setUploadedImage: (image: string | null) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
};

export const useAnalysisStore = create<Store>((set) => ({
  uploadedImage: null,
  analysisResult: null,
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
}));
