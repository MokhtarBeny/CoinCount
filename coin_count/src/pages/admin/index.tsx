import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData, updateCryptoVisibility } from "../../store/thunks/cryptoThunk"; // Importing the thunk from the correct file
import { selectCrypto } from "../../store/slices/cryptoSlice"; // Importing the selector from the slice
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import axios from "axios";
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

import { EyeOutlined } from "@ant-design/icons";

function AdminDashboard() {
	const dispatch: AppDispatch = useDispatch();
	const { crypto, loading, error } = useSelector(selectCrypto);
	const auth = useSelector((state: any) => state.auth);
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

	// Table
	const [page, setPage] = React.useState(1);
	const rowsPerPage = 12;
	const [selectedColor, setSelectedColor] = React.useState("default");
	// Check if crypto is not null before accessing length
	const pages = crypto ? Math.ceil(crypto.length / rowsPerPage) : 0;

	const items = React.useMemo(() => {
		// Ensure crypto is an array before slicing
		if (Array.isArray(crypto)) {
			const start = (page - 1) * rowsPerPage;
			const end = start + rowsPerPage;
			return crypto.slice(start, end);
		}
		return []; // Return an empty array if crypto is not an array
	}, [page, crypto, rowsPerPage]);

	const statusColorMap = {
		active: "success",
		paused: "danger",
	};

     // Change crypto visibility 
     const handleChangeVisibility = (cryptoId: string) => {
          dispatch(updateCryptoVisibility(cryptoId));
      };

	// Table Pagination
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

	// Admin
	useEffect(() => {
		const checkAdminRole = async () => {
			try {
				const response = await axiosInstance.get("/check-admin");
				console.log(response);
				if (!response.data.isAdmin) {
					router.push("/unauthorized");
					return; // Ensure no further execution after redirection
				}
				setIsAdmin(true); // Set admin status to true
			} catch (error) {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					router.push("/login");
					return;
				} else {
					console.error("Error:", error);
					router.push("/error");
					return;
				}
			}
		};

		checkAdminRole();
	}, [router]);

	// Crypto Data
	useEffect(() => {
		dispatch(fetchCryptoData());
	}, [dispatch]);

	if (loading)
		return (
			<div className="flex justify-center">
				{" "}
				<CircularProgress label="Loading..." />
			</div>
		);
	if (error) return <p>Error loading data</p>;
	if (!crypto)
		return (
			<Table aria-label="Example empty table">
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>Price</TableColumn>
					<TableColumn>STATUS</TableColumn>
				</TableHeader>
				<TableBody emptyContent={"No data available."}>{[]}</TableBody>
			</Table>
		);

	return (
		<div>
			<p>Username : {auth.user.email}</p>
			<Table
				aria-label="Crypto Data Table"
				bottomContent={bottomContent}
				classNames={{
					wrapper: "min-h-[222px]",
				}}
				selectionMode="single"
				color="primary"
			>
				<TableHeader>
					<TableColumn>RANK</TableColumn>
					<TableColumn>NAME</TableColumn>
					<TableColumn>SYMBOL</TableColumn>
					<TableColumn>PRICE USD</TableColumn>
					<TableColumn>MARKET CAP USD</TableColumn>
					<TableColumn>Visibility</TableColumn>
					<TableColumn>Actions</TableColumn>
					{/* Add more columns as needed */}
				</TableHeader>
				<TableBody>
					{items.map(
						(item: {
							id: React.Key | null | undefined;
							rank:
								| string
								| number
								| boolean
								| React.ReactElement<
										any,
										string | React.JSXElementConstructor<any>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| React.PromiseLikeOfReactNode
								| null
								| undefined;
							name:
								| string
								| number
								| boolean
								| React.ReactElement<
										any,
										string | React.JSXElementConstructor<any>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| React.PromiseLikeOfReactNode
								| null
								| undefined;
							symbol:
								| string
								| number
								| boolean
								| React.ReactElement<
										any,
										string | React.JSXElementConstructor<any>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| React.PromiseLikeOfReactNode
								| null
								| undefined;
							priceUsd:
								| string
								| number
								| boolean
								| React.ReactElement<
										any,
										string | React.JSXElementConstructor<any>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| React.PromiseLikeOfReactNode
								| null
								| undefined;
							marketCapUsd:
								| string
								| number
								| boolean
								| React.ReactElement<
										any,
										string | React.JSXElementConstructor<any>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| React.PromiseLikeOfReactNode
								| null
								| undefined;
						}) => (
							<TableRow key={item.id} className="cursor-pointer">
								<TableCell>{item.rank}</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.symbol}</TableCell>
								<TableCell>{item.priceUsd}</TableCell>
								<TableCell>{item.marketCapUsd}</TableCell>
								<TableCell>Active</TableCell>
								<TableCell>
									{" "}
									<div className="relative flex items-center gap-2">
										<Tooltip content="Visibilité de la crypto">
											<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
												<EyeOutlined onClick={() => handleChangeVisibility(item.id as string)} />
											</span>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export default AdminDashboard;
