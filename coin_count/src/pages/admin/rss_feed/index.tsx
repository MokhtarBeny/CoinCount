// Emplacement : CoinCount\coin_count\src\pages\admin\rss_feed\index.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    //fetchArticleAdminData,
    updateArticleVisibility,
    updateArticleVisibilityAction,

} from "../../../../../coin_count_api/src/controllers/admin";
import { selectAdminCrypto } from "../../../../../coin_count/src/store/slices/cryptoSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axios/axiosConfig";
import {
    CircularProgress,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";

import { EyeInvisibleTwoTone, EyeTwoTone } from "@ant-design/icons";
import checkAdminRole from "@/utils/auth/admin/checkAdmin";
import { toast } from "react-toastify";

function AdminArticleDashboard() {
    const dispatch: AppDispatch = useDispatch();
    const { articles, loading, error } = useSelector(selectAdminCrypto);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 12;
    const pages = articles ? Math.ceil(articles.length / rowsPerPage) : 0;

    const items = React.useMemo(() => {
        if (Array.isArray(articles)) {
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            return articles.slice(start, end);
        }
        return [];
    }, [page, articles, rowsPerPage]);

    const handleChangeVisibility = (articleId: string) => {
        updateArticleVisibilityAction(articleId)
            .then((response) => {
                toast.success("Crypto visibility updated successfully!");
                // Mettez à jour votre état local ou dispatchez une action Redux si nécessaire
            })
            .catch((error) => {
                toast.error("Failed to update crypto visibility: " + error.message);
            });
    };

    useEffect(() => {
        const checkRole = async () => {
            const isAdmin = await checkAdminRole(axiosInstance, router);
            setIsAdmin(isAdmin);
        };
        checkRole();
    }, [router]);

    // useEffect(() => {
    //     dispatch(fetchArticleAdminData());
    // }, [dispatch]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        );
    }, [page, pages]);

    if (loading) {
        return (
            <div className="flex justify-center">
                <CircularProgress label="Loading..." />
            </div>
        );
    }

    if (error) {
        return <p>Error loading data</p>;
    }

    if (!articles) {
        return (
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No data available."}>{[]}</TableBody>
            </Table>
        );
    }

    return (
        <div className="m-12">
            <Table
                aria-label="Article Data Table"
                bottomContent={bottomContent}
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
                selectionMode="single"
                color="primary"
            >
                <TableHeader>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} className="cursor-pointer">
                            <TableCell>{item.title}</TableCell>
                            <TableCell>
                                <span>{item.status}</span>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Visibility">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            {item.visibility ? (
                                                <EyeTwoTone
                                                    twoToneColor="#52c41a"
                                                    onClick={() =>
                                                        handleChangeVisibility(item.id)
                                                    }
                                                />
                                            ) : (
                                                <EyeInvisibleTwoTone
                                                    twoToneColor="#eb2f96"
                                                    onClick={() =>
                                                        handleChangeVisibility(item.id)
                                                    }
                                                />
                                            )}
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminArticleDashboard;
