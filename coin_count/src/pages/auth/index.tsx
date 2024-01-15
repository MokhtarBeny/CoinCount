import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import storage from "@/utils/auth/localStorage";
import getAxiosInstance from "@/utils/axios/getAxiosInstance";

const AuthPage = () => {
  const axiosInstance = getAxiosInstance();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const refreshMyToken = async (token: string) => {
      try {
        localStorage.setItem("t", token);
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

    const t = query.t as string | undefined;
    if (t) {
      refreshMyToken(t);
    }
  }, [query, axiosInstance, dispatch, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default AuthPage;
