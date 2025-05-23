import { Camera, Sparkles, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useAnalysisStore } from "../../store/useAnalysisStore";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const { uploadedImage, setUploadedImage, setAnalysisResult } =
    useAnalysisStore();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const mockResults = [
        {
          acneType: "Inflammatory Acne",
          severity: "Moderate",
          products: [
            "Benzoyl Peroxide 2.5%",
            "Salicylic Acid Cleanser",
            "Niacinamide Serum",
            "Gentle Moisturizer",
          ],
          confidence: 87,
        },
        {
          acneType: "Comedonal Acne",
          severity: "Mild",
          products: [
            "Retinol Cream",
            "BHA Exfoliant",
            "Gentle Cleanser",
            "Hyaluronic Acid Moisturizer",
          ],
          confidence: 92,
        },
        {
          acneType: "Cystic Acne",
          severity: "Severe",
          products: [
            "Prescription Tretinoin",
            "Antibacterial Cleanser",
            "Hydrocortisone Cream",
            "Oil-Free Moisturizer",
          ],
          confidence: 78,
        },
      ];

      const randomResult =
        mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      navigate("/analysis");
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setUploadedImage(imageData);
        setShowCamera(false);
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        analyzeImage();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Acne Analysis
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload a photo or take a live picture to get personalized acne
            analysis and product recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!uploadedImage && !showCamera && (
            <div className="grid md:grid-cols-2 gap-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Upload Photo
                  </h3>
                  <p className="text-gray-600">
                    Choose an image from your device
                  </p>
                </div>
              </div>

              <div
                onClick={startCamera}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Take Photo
                  </h3>
                  <p className="text-gray-600">
                    Use your camera to capture an image
                  </p>
                </div>
              </div>
            </div>
          )}

          {showCamera && (
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Position Your Face
                </h3>
                <p className="text-gray-600">
                  Make sure your face is well-lit and clearly visible
                </p>
              </div>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-2xl"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={capturePhoto}
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
                >
                  Capture Photo
                </button>
                <button
                  onClick={() => setShowCamera(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {uploadedImage && isAnalyzing && (
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center">
              <div className="animate-spin w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Analyzing Your Image
              </h3>
              <p className="text-gray-600">
                Our AI is examining your skin condition...
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
