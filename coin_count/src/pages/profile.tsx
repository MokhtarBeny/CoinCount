import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import { Avatar, Image, Spacer } from "@nextui-org/react";
import getAxiosInstance from "@/utils/axios/getAxiosInstance";
import { login, logout } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import WatchListTable from "./components/WatchlistTable";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const axiosInstance = getAxiosInstance();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    watchlist: [],
  });
  const [watchlist, setWatchlist] = useState([]);
  const [isEditable, setIsEditable] = useState({
    user: false,
    password: false,
  });

  useEffect(() => {
    if (auth.token) {
      const userA = auth.user;
      setUser((prevUser) => ({
        ...prevUser,
        username: userA.username,
        email: userA.email,
      }));
    } else {
      // router.push("/login");
    }
  }, [auth, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const toggleEditMode = (type: string) => {
    if (type === "user") {
      setIsEditable((prev) => ({
        ...prev,
        user: !prev.user,
      }));
    }
    if (type === "password") {
      setIsEditable((prev) => ({
        ...prev,
        password: !prev.password,
      }));
    }
  };

  const savePassword = async () => {
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axiosInstance.put("/auth/change-password", {
        password: user.password,
      });
      setUser((prevUser) => ({
        ...prevUser,
        password: "",
        confirmPassword: "",
      }));
      let data = res.data;
      toast.success("Password changed successfully");
      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );
      toggleEditMode("password");
    } catch (err) {
      toast.error("An error occured, please try again");
      console.log("Profile error", err)
    }
  };
  const saveUser = async () => {
    try {
      const res = await axiosInstance.put("/auth/change-username", {
        username: user.username,
      });
      setUser((prevUser) => ({
        ...prevUser,
        username: res.data.user.username,
      }));

      let data = res.data;
      toast.success("Username changed successfully");
      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );
      toggleEditMode("user");
    } catch (err) {
      toast.error("An error occured, please try again");
      console.log("Profile error2", err)
    }
  };

  useEffect(() => {
    if (!auth.user) {
      router.push("/login");
    }
  }, [auth.user, router, router.route]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col md:flex-row">
         <div className="w-full sm:w-2/5 flex flex-col items-center justify-center">     
                 <Avatar
              classNames={{
                base: "w-60 h-60 bg-gradient-to-br from-[#57C1FF] to-[#005BFF]",

                icon: "text-black/80",
              }}
              alt="User Avatar"
            />
            <h3 className="text-xl font-semibold mt-3">
              {auth.user.username || ""}
            </h3>
            <p className="text-gray-500">{auth.user.email || ""}</p>
            <button
              onClick={() => {
                dispatch(logout());
                toast.success("Logged out successfully");
                localStorage.removeItem("t");
                router.push("/");
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Logout
            </button>
          </div>

          <div className="w-full md:w-3/5 mt-4 md:mt-0">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  toggleEditMode("user");
                }}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition duration-300 mr-5"
              >
                <span>Edit Profile</span>
                <EditOutlined />
              </button>
              <button
                onClick={() => {
                  toggleEditMode("password");
                }}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition duration-300"
              >
                <span>Edit Password</span>
                <EditFilled />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isEditable.user
                      ? "text-gray-700 focus:shadow-outline"
                      : "text-gray-500 bg-gray-200 cursor-not-allowed"
                  }`}
                  readOnly={!isEditable.user}
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    false
                      ? "text-gray-700 focus:shadow-outline"
                      : "text-gray-500 bg-gray-200 cursor-not-allowed"
                  }`}
                  readOnly={true}
                />
              </div>
              <div className="border-b border-gray-200 " />
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isEditable.password
                      ? "text-gray-700 focus:shadow-outline"
                      : "text-gray-500 bg-gray-200 cursor-not-allowed"
                  }`}
                  readOnly={!isEditable.password}
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isEditable.password
                      ? "text-gray-700 focus:shadow-outline"
                      : "text-gray-500 bg-gray-200 cursor-not-allowed"
                  }`}
                  readOnly={!isEditable.password}
                />
              </div>
            </div>
            <div className="mt-4">
              {isEditable.user && (
                <button
                  onClick={saveUser}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Save Changes
                </button>
              )}
              {isEditable.password && (
                <button
                  onClick={savePassword}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4 w-full overflow-scroll">
          <WatchListTable />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
