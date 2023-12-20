import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { EditFilled, EditOutlined } from "@ant-design/icons";
import { Image, Spacer } from "@nextui-org/react";

const ProfilePage: React.FC = () => {
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

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  console.log(auth.user);

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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly={!isEditable}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly={!isEditable}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly={!isEditable}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly={!isEditable}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={toggleEditMode}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isEditable ? "Save Changes" : "Edit Profile"}
              </button>
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
