import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import { Image, Spacer } from "@nextui-org/react";
import getAxiosInstance from "@/utils/axios/getAxiosInstance";
import { login } from "@/store/slices/authSlice";

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
    watchlists: [],
  });
  const [isEditable, setIsEditable] = useState({
    user: false,
    password: false,
  });

  useEffect(() => {
    console.log(auth.token);
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
      alert("Password and Confirm Password do not match");
      return;
    }
    try {
      const res = await axiosInstance.put("/auth/change-password", {
        password: user.password,
      });

      console.log(res.data);
      setUser((prevUser) => ({
        ...prevUser,
        password: "",
        confirmPassword: "",
      }));

      let data = res.data;

      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );
      toggleEditMode("password");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const saveUser = async () => {
    try {
      const res = await axiosInstance.put("/auth/change-username", {
        username: user.username,
      });

      console.log(res.data);
      setUser((prevUser) => ({
        ...prevUser,
        username: res.data.user.username,
      }));

      let data = res.data;

      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );
      toggleEditMode("user");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex">
          {/* Right Side - Avatar and User Info (2/5) */}
          <div className="w-2/5 flex flex-col items-center justify-center">
            <Image
              isZoomed
              isBlurred
              width={300}
              height={300}
              alt="User Avatar"
              src="https://images.augustman.com/wp-content/uploads/sites/3/2022/12/22170208/untitled-design-2022-12-21t111850-107.jpeg"
            />
            <h3 className="text-xl font-semibold mt-3">
              {auth.user.username || ""}
            </h3>
            <p className="text-gray-500">{auth.user.email || ""}</p>
          </div>

          <div className="w-3/5">
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

        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="text-lg font-semibold mb-4">Watchlists</h4>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
