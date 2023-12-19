import { login } from "@/store/slices/authSlice";
import storage from "@/utils/auth/localStorage";
import axiosInstance from "@/utils/axios/axiosConfig";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GithubFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import Link from "next/link";
import {
  useSession,
  signIn as socialSignIn,
  signOut as socialSignOut,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { data, status, session } = useSession();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await axiosInstance.post("/login", form);
      let { token, user } = res.data;
      user = {
        username: user.username,
        email: user.email,
        watchlists: user.watchlists,
        id: user._id,
      };
      if (res.status === 200) {
        dispatch(
          login({
            token,
            user,
          })
        );
      }
      await storage.saveToLocalStorage("t", token);
      router.push("/")
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const res = await signIn(provider, { callbackUrl: "/" });
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white">
        <form className="w-96 p-8">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={handleTogglePassword}
              >
                {!showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Sign In
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          <div className="mt-4">
            <p className="text-gray-600">Or sign in with:</p>
            <div className="flex mt-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                onClick={() => handleSocialLogin("facebook")}
              >
                Facebook
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => handleSocialLogin("google")}
              >
                Google
              </button>
            </div>
          </div>
        </form>
        <div className="flex-row items-center justify-center">
          <p className="text-gray-600">Or sign in with:</p>
          <div className="flex mt-2">
            <button
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150 mr-2"
              onClick={() => handleSocialLogin("github")}
            >
              <span className="inline-flex items-center">
                <GithubFilled />
              </span>
            </button>
            <button
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150 mr-2"
              onClick={() => handleSocialLogin("google")}
            >
              <span className="inline-flex items-center">
                <GoogleCircleFilled />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex">
          <p className="text-gray-600 mr-2">Don't have an account?</p>
          <Link
            href={"/register"}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
