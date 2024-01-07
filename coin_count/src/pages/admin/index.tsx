import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCryptoAdminData,
	updateCryptoVisibility,
} from "../../store/thunks/cryptoThunk"; // Importing the thunk from the correct file
import {
	selectAdminCrypto,
} from "../../store/slices/cryptoSlice"; // Importing the selector from the slice
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axios/axiosConfig";
import {
	Chip,
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

function AdminDashboard() {
	const dispatch: AppDispatch = useDispatch();
	const { crypto, loading, error } = useSelector(selectAdminCrypto);
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

	// Table
	const [page, setPage] = React.useState(1);
	const rowsPerPage = 12;
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

	// Change crypto visibility
	const handleChangeVisibility = (cryptoId: string) => {
		dispatch(updateCryptoVisibility(cryptoId)) .then(() => {
               toast.success("Crypto visibility updated successfully!");
           })
           .catch((error) => {
               toast.error("Failed to update crypto visibility: " + error.message);
           });
	};

	

	// Admin
	useEffect(() => {
		const checkRole = async () => {
			const isAdmin = await checkAdminRole(axiosInstance, router);
			setIsAdmin(isAdmin);
		};
		checkRole();
	}, [router]);

	// Crypto Data
	useEffect(() => {
		dispatch(fetchCryptoAdminData());
	}, [dispatch]);



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
		<div className="m-12">
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
					{items.map((item) => (
						<TableRow key={item.id} className="cursor-pointer">
							<TableCell>{item.rank}</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.symbol}</TableCell>
							<TableCell>
								{parseFloat(item.priceUsd).toFixed(2)} $
							</TableCell>
							<TableCell>
								{parseFloat(item.marketCapUsd).toFixed(2)}${" "}
							</TableCell>
							<TableCell>
								{" "}
								<Chip
									className={
										item.visibility
											? "bg-green-500/20 text-green-900 font-extrabold"
											: "bg-red-500/20 text-red-900"
									}
								>
									{" "}
									{item.visibility ? "Visible" : "Hidden"}
								</Chip>
							</TableCell>
							<TableCell>
								<div className="relative flex items-center gap-2">
									<Tooltip content="Visibilité de la crypto">
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

export default AdminDashboard;
