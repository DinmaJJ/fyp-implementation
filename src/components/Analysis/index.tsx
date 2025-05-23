import { useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useAnalysisStore } from "../../store/useAnalysisStore";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const navigate = useNavigate()
  const { uploadedImage, analysisResult } = useAnalysisStore();

  useEffect(() => {
    if (!uploadedImage || !analysisResult) {
      navigate("/dashboard");
    }
  }, [uploadedImage, analysisResult, navigate]);

  if (!uploadedImage || !analysisResult) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Acne Analysis
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Based on the image you provided, here are your results:
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full rounded-2xl mb-6"
            />
            <div className="space-y-4 text-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Acne Type
                </h3>
                <p className="text-purple-700 text-lg font-medium">
                  {analysisResult.acneType}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Severity
                </h3>
                <p className="text-red-600 text-lg font-medium">
                  {analysisResult.severity}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Confidence
                </h3>
                <p className="text-green-600 text-lg font-medium">
                  {analysisResult.confidence}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Recommended Products
            </h3>
            <ul className="space-y-4">
              {analysisResult.products.map((product, index) => (
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
    </div>
  );
};

export default Analysis;
