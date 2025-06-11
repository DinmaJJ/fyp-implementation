import { Camera, LogOut, Sparkles, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/useLogin";
import { useAnalysis } from "../../hooks/useAnalysis";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleLogout } = useLogin();
  const { mutate: analyzeImage, isPending: isAnalyzing, data: analysisResult } = useAnalysis();

  const [showCamera, setShowCamera] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        analyzeImage(file);
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
        
        // Convert base64 to File
        fetch(imageData)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
            analyzeImage(file);
          });
      }
    }
  };

  const handleNewAnalysis = () => {
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
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
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">Logout</span>
          </button>
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

          {uploadedImage && analysisResult && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
                <button
                  onClick={handleNewAnalysis}
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">New Analysis</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full rounded-2xl mb-6"
                  />
                  <div className="space-y-4 text-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Acne Types
                      </h3>
                      <p className="text-purple-700 text-lg font-medium">
                        {analysisResult.acne_types.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Recommended Products
                  </h3>
                  <ul className="space-y-4">
                    {analysisResult.recommendations.map((product, index) => (
                      <li
                        key={index}
                        className="flex items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <CheckCircle className="text-green-500 w-5 h-5 mr-3" />
                        <span className="text-gray-700">{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
