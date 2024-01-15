// Emplacement : CoinCount\coin_count\src\pages\admin\rss_feed\index.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axios/axiosConfig";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Input,
} from "@nextui-org/react";

import checkAdminRole from "@/utils/auth/admin/checkAdmin";
import { toast } from "react-toastify";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";

export default function AdminArticleSource() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  const [newSourceInput, setNewSourceInput] = useState({
    url: "",
    name: "",
  });
  const [articleSource, setArticleSource] = useState([]);

  useEffect(() => {
    const checkRole = async () => {
      const isAdmin = await checkAdminRole(axiosInstance, router);
      setIsAdmin(isAdmin);
    };
    checkRole();
  }, [router]);

  const toggleActiveState = async (sourceId: string, type: string) => {
    try {
      const response = await axiosInstance.put(`/sources/${sourceId}`, {
        type: type,
      });
      setArticleSource(response.data.sources);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addToSource = async () => {
    try {
      const response = await axiosInstance.post("/sources", {
        url: newSourceInput.url,
        name: newSourceInput.name,
      });

      toast.success("Source ajoutée avec succès");
      setNewSourceInput({
        url: "",
        name: "",
      });
      setArticleSource(response.data.sources);
      return;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteSource = async (sourceId: string) => { 
    try {
      const response = await axiosInstance.delete(`/sources/${sourceId}`);
      setArticleSource(response.data.sources);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const fetchArticleSources = async () => {
      try {
        const response = await axiosInstance.get("/sources");
        setArticleSource(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchArticleSources();
  }, []);

  const returnBadgeByStatus = (status: string) => {
    if (status) {
      return (
        <Chip color="success" variant="bordered">
          Active
        </Chip>
      );
    } else {
      return (
        <Chip color="danger" variant="bordered">
          Not Active
        </Chip>
      );
    }
  };

  return (
    <div className="container mx-auto my-5 p-2 sm:p-0">
      <div className="flex p-4 shadow-lg rounded my-5 border sm:flex-row flex-col align-center justify-center ">
        <Input
          className="w-full md:w-1/4 p-2"
          placeholder="Source Name"
          value={newSourceInput.name}
          onChange={(e) =>
            setNewSourceInput({ ...newSourceInput, name: e.target.value })
          }
        />
        <Input
          className="w-full md:w-2/4 p-2"
          placeholder="Url of the source"
          value={newSourceInput.url}
          onChange={(e) =>
            setNewSourceInput({ ...newSourceInput, url: e.target.value })
          }
        />

        <button
          className="w-1/2  md:w-1/4 text-white bg-green-500 rounded-md p-2 "
          onClick={() => {
            addToSource();
          }}
        >
          Ajouter une source
        </button>
      </div>
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>URL</TableColumn>
          <TableColumn>Current Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {articleSource.map((source, key) => {
            return (
              <TableRow key="1">
                <TableCell>{key + 1}</TableCell>
                <TableCell>
                  <strong>{source.name}</strong>
                </TableCell>
                <TableCell className="text-blue-500 underline">
                  <a href={source.url} target="_blank">
                    {source.url}
                  </a>
                </TableCell>
                <TableCell>{returnBadgeByStatus(source.active)}</TableCell>
                <TableCell>
                  <div className="flex align-center gap-2 ">
                    {source.active ? (
                      <button
                        className="p-1 px-3 m-2 text-white bg-red-500 rounded-md"
                        onClick={() =>
                          toggleActiveState(source._id, "deactivate")
                        }
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="p-1 px-3 text-white bg-green-500 rounded-md"
                        onClick={() =>
                          toggleActiveState(source._id, "activate")
                        }
                      >
                        Activate
                      </button>
                    )}
                    <button className="p-1 pb-2 px-3 "
                      onClick={() => deleteSource(source._id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

