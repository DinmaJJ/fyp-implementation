import {
  Lock,
  ArrowRight,
  Droplets,
  Mail,
  Sparkles,
  Calendar,
  Users,
  Baby,
} from "lucide-react";
import { useState } from "react";

export interface UserData {
  email: string;
  password: string;
  age: string;
  gender: string;
  pregnancy: string;
  skinType: string;
}

const Signup = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    age: "",
    gender: "",
    pregnancy: "no",
    skinType: "",
  });

  const skinTypes = [
    "Normal",
    "Dry",
    "Oily",
    "Combination",
    "Sensitive",
    "Acne-Prone",
  ];
  const handleSignup = () => {};
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            SkinAI
          </h1>
          <p className="text-gray-600 mt-2">Join our community</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="Age"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                value={userData.age}
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="relative">
              <Baby className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                value={userData.pregnancy}
                onChange={(e) =>
                  setUserData({ ...userData, pregnancy: e.target.value })
                }
              >
                <option value="no">Not Pregnant</option>
                <option value="yes">Pregnant</option>
                <option value="trying">Trying to Conceive</option>
                <option value="na">Not Applicable</option>
              </select>
            </div>

            <div className="relative">
              <Droplets className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                value={userData.skinType}
                onChange={(e) =>
                  setUserData({ ...userData, skinType: e.target.value })
                }
                required
              >
                <option value="">Select Skin Type</option>
                {skinTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>"Create Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300">
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
