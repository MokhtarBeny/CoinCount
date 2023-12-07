import { useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axios/axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import storage from "@/utils/auth/localStorage";

const AuthPage = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();

  const refreshMyToken = async (token: string) => {
    try {
      await storage.saveToLocalStorage("t", token);
      const resp = await axiosInstance.get("/refresh_token", {
        params: { token },
      });
      const { token: refreshedToken, user } = resp.data;
      dispatch(
        login({ token: refreshedToken, user: { ...user, id: user._id } })
      );
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const t = query.t as string | undefined;
    if (t) {
      refreshMyToken(t);
    }
  }, [query]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default AuthPage;
