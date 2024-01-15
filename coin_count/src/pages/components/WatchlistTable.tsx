// src/pages/dashboard.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios/axiosConfig";
import {
	DeleteFilled,
	EyeFilled,
	StarFilled,
	StarOutlined,
} from "@ant-design/icons";
import { Sparklines, SparklinesLine } from "react-sparklines";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchWatchlist, removeFromWatchlist } from "@/utils/axios/watchlist";

const WatchListTable = () => {
		const [watchlist, setWatchlist] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const formatPrice = (price) => {
		const numPrice = parseFloat(price);
		if (numPrice < 0.01) {
			return numPrice.toPrecision(2);
		}
		return numPrice.toFixed(2);
	};

	const [sortField, setSortField] = useState<string | null>("rank");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const handleSort = (field: string) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	const sortedwatchlist = React.useMemo(() => {
		if (!sortField) return watchlist;
		return [...watchlist].sort((a, b) => {
			if (sortField === "rank" || sortField === "priceUsd") {
				const valueA =
					sortField === "rank" ? a.rank : parseFloat(a.priceUsd);
				const valueB =
					sortField === "rank" ? b.rank : parseFloat(b.priceUsd);
				return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
			}
			return 0;
		});
	}, [watchlist, sortField, sortDirection]);

	const hashStringToSeed = (str: string) => {
		let hash = 0;
		if (str) {
			// Check if str is defined
			for (let i = 0; i < str.length; i++) {
				const char = str.charCodeAt(i);
				hash = (hash << 5) - hash + char;
				hash = hash & hash;
			}
		}
		return hash;
	};
	const seededRandom = (seed) => {
		const m = 0x80000000;
		seed = (seed * 9301 + 49297) % 233280;
		return seed / m;
	};

	const generateTrendData = (changePercent, length = 5, name) => {
		let seed = hashStringToSeed(name);
		let trendData = [50];
		for (let i = 1; i < length; i++) {
			const rand = seededRandom(seed);
			trendData.push(
				trendData[i - 1] + (changePercent > 0 ? 1 : -1) * rand * 10
			);
			seed = trendData[i];
		}
		return trendData;
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchWatchlist();
			setWatchlist(data); // Update state with the fetched data
		};

		fetchData();
	}, []);

	const formatChangePercent = (percent: string) => {
		const change = parseFloat(percent);
		const className = change < 0 ? "text-red-500" : "text-green-500";
		return <span className={className}>{change.toFixed(2)}%</span>;
	};

	const handleRemoveFromWatchlist = async (coin: { _id: string; }) => {
		setIsLoading(true);
		try {
			const updatedWatchlist = await removeFromWatchlist(coin);
			if (updatedWatchlist) {
				// Update the local state with the new watchlist
				setWatchlist(updatedWatchlist);
			} else {
				// If the removeFromWatchlist function doesn't return the updated list,
				// manually filter out the removed item from the local state.
				setWatchlist((prevWatchlist) =>
					prevWatchlist.filter((item) => item._id !== coin._id)
				);
			}
		} catch (error) {
			toast.error("Error removing from watchlist");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-8">
			<div className="py-8">
				<div>
					<h2 className="text-2xl font-semibold leading-tight">
						My Watchlist
					</h2>
				</div>
				<div className="my-2 flex sm:flex-row flex-col">
					{/* Ici, vous pouvez ajouter des boutons de filtrage ou de tri si nécessaire */}
				</div>
				<div className="inline-block min-w-full shadow rounded-lg overflow-x-auto">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
							<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5 cursor-pointer" onClick={() => handleSort("rank")}>
									Rank
									{sortField === "rank" &&
										(sortDirection === "asc" ? "↑" : "↓")}
								</th>
								<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5 cursor-pointer">
									Coin
								</th>
								<th
									className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5 cursor-pointer"
									onClick={() => handleSort("priceUsd")}
								>
									Price
									{sortField === "priceUsd" &&
										(sortDirection === "asc" ? "↑" : "↓")}
								</th>
								<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5">
									24h
								</th>
								<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5">
									Volume sur 24h en $
								</th>
								<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5">
									Market Cap
								</th>
								<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5">
									Sparkline
								</th>
								<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:px-5">
									Favorite
								</th>
							</tr>
						</thead>
						<tbody>
							{sortedwatchlist.map((coin, index) => (
								<tr key={index}>
                  					<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
								<p className="text-gray-900 whitespace-no-wrap">
											{coin.rank}
										</p>
									</td>
									<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
										<Link
											href={`/crypto/${coin.id}`}
											className="btn btn-primary px-3"
										>
											<div className="flex items-center">
												<div className="ml-3">
													<p className="text-gray-900 whitespace-no-wrap font-bold">
														{" "}
														{/* Nom de la cryptomonnaie en gras */}
														{coin.name} {coin.symbol}
													</p>
												</div>
											</div>
										</Link>
									</td>
									<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
										<p className="text-gray-900 whitespace-no-wrap">
											${formatPrice(coin.priceUsd)}
										</p>
									</td>
									<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
										{formatChangePercent(coin.changePercent24Hr)}
									</td>
									<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
										<p className="text-gray-900 whitespace-no-wrap">
											$
											{parseInt(coin.volumeUsd24Hr).toLocaleString()}{" "}
											{/* Volume avec séparateurs de milliers */}
										</p>
									</td>
									<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
										<p className="text-gray-900 whitespace-no-wrap">
											${parseInt(coin.marketCapUsd).toLocaleString()}{" "}
											{/* Market Cap avec séparateurs de milliers */}
										</p>
									</td>
                  					<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
										<Sparklines
											data={generateTrendData(
												coin.changePercent24Hr,
												5,
												coin.name || ""
											)}
											height={20}
											width={100}
										>
											<SparklinesLine
												color={
													coin.changePercent24Hr >= 0
														? "green"
														: "red"
												}
											/>
										</Sparklines>
									</td>
									<td className="px-2 py-5 border-b border-gray-200 bg-white text-sm sm:px-5">
										<button
											className="btn btn-primary px-3 "
											onClick={() => handleRemoveFromWatchlist(coin)}
										>
											<DeleteFilled className="text-red-500" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};


export default WatchListTable; 