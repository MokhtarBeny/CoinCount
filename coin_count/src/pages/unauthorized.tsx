import { StopOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Unauthorized(props: Props) {
  return (
    <div className="flex items-center justify-center  mt-5 py-5">
      <div className="text-center">
        <div className="text-6xl text-red-600">
          <StopOutlined />
        </div>
        <h1 className="text-4xl font-bold mt-4">Unauthorized Access</h1>
        <p className="text-lg mt-4">
          Sorry, you do not have permission to view this page.
        </p>
        <Link href="/">
          <button className="mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
