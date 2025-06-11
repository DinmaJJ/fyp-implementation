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
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../hooks/useRegister";

const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.number().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  pregnancy: z.string().optional(),
  skinType: z.string().min(1, "Skin type is required"),
});

export type SignupData = z.infer<typeof signupSchema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({ resolver: zodResolver(signupSchema) });

  const skinTypes = [
    "Normal",
    "Dry",
    "Oily",
    "Combination",
    "Sensitive",
    "Acne-Prone",
  ];

  const { mutate: signup, isPending } = useRegister();

  const handleSignup = (data: SignupData) => {
    signup(data);
  };

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

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="Age"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.age ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.gender ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Baby className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.pregnancy ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                {...register("pregnancy")}
              >
                <option value="">Are you pregnant?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="not_applicable">Not Applicable</option>
              </select>
              {errors.pregnancy && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pregnancy.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Droplets className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  errors.skinType ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                {...register("skinType")}
              >
                <option value="">Select Skin Type</option>
                {skinTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.skinType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skinType.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing up...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
