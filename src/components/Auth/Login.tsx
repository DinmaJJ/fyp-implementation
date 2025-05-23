import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Lock, Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const handleLogin = (data: LoginFormData) => {
    console.log("Logging in with:", data);
    navigate("/");
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
          <p className="text-gray-600 mt-2">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
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
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
