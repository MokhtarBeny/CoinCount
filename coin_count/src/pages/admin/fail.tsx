import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "../../store/thunks/cryptoThunk"; // Importing the thunk from the correct file
import { selectCrypto } from "../../store/slices/cryptoSlice"; // Importing the selector from the slice
import { AppDispatch } from "@/store/store";
import storage from "@/utils/auth/localStorage";
import { useRouter } from "next/router";
import axios from "axios";
import axiosInstance from "@/utils/axios/axiosConfig";
import {
     Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Input,
     Button,
     DropdownTrigger,
     Dropdown,
     DropdownMenu,
     DropdownItem,
     Chip,
     User,
     Pagination,
     Selection,
     ChipProps,
     SortDescriptor
} from "@nextui-org/react";
import { ICryptoData } from "@/utils/interface/cryptosInterface";
import { VerticalDotsIcon } from "../components/adminTable/icons/VerticalDotsIcon";
import { PlusIcon } from "../components/adminTable/icons/PlusIcon";
import { SearchIcon } from "../components/adminTable/icons/SearchIcon";
import { ChevronDownIcon } from "../components/adminTable/icons/ChevronDownIcon";



// Table 

const statusColorMap: Record<string, ChipProps["color"]> = {
     active: "success",
     paused: "danger",

   };
   const INITIAL_VISIBLE_COLUMNS = ["RANK", "NAME", "SYMBOL", "PRICE USD", "MARKET CAP USD", "Visibility"];

   const columns = [
     { name: "ID", uid: "id", sortable: true },
     { name: "Rank", uid: "rank", sortable: true },
     { name: "Symbol", uid: "symbol", sortable: true },
     { name: "Name", uid: "name", sortable: true },
     { name: "Supply", uid: "supply", sortable: true },
     { name: "Max Supply", uid: "maxSupply", sortable: true },
     { name: "Market Cap (USD)", uid: "marketCapUsd", sortable: true },
     { name: "Volume (24Hr USD)", uid: "volumeUsd24Hr", sortable: true },
     { name: "Price (USD)", uid: "priceUsd", sortable: true },
     { name: "Change % (24Hr)", uid: "changePercent24Hr", sortable: true },
     { name: "VWAP (24Hr)", uid: "vwap24Hr", sortable: true },
     { name: "Explorer", uid: "explorer", sortable: true },
     {name: "ACTIONS", uid: "actions"},   ];
   
   const statusOptions = [
     {name: "Active", uid: "active"},
     {name: "Paused", uid: "paused"},

   ];



function AdminDashboard() {
     const dispatch: AppDispatch = useDispatch();
     const { crypto, loading, error } = useSelector(selectCrypto);
     const auth = useSelector((state: any) => state.auth);
     const router = useRouter();
     const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
     
     // Table Const 
      const [filterValue, setFilterValue] = useState("");
      const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
      const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
      const [statusFilter, setStatusFilter] = useState<Selection>("all");
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "rank",
        direction: "ascending",
      });
    
      const [page, setPage] = useState(1);
    
      const hasSearchFilter = Boolean(filterValue);
    
      const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
    
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
      }, [visibleColumns]); 
 
      const filteredItems = React.useMemo(() => {
          // Check if crypto is an array and not null/undefined
          if (!Array.isArray(crypto)) {
            return []; // Return an empty array if crypto is not iterable
          }
        
          let filteredCryptos = [...crypto]; // Now it's safe to spread `crypto`
        
          if (hasSearchFilter) {
            filteredCryptos = filteredCryptos.filter((token) =>
              token.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
          }
        
          if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredCryptos = filteredCryptos.filter((token) =>
              Array.from(statusFilter).includes(token.status),
            );
          }
        
          return filteredCryptos;
        }, [crypto, filterValue, hasSearchFilter, statusFilter]);
        


           const pages = Math.ceil(filteredItems.length / rowsPerPage);
           const items = React.useMemo(() => {
               const start = (page - 1) * rowsPerPage;
               const end = start + rowsPerPage;
           
               return filteredItems.slice(start, end);
             }, [page, filteredItems, rowsPerPage])
           
             const sortedItems = React.useMemo(() => {
               // Check if crypto is an array and not null/undefined
               if (!Array.isArray(crypto)) {
                 return []; // Return an empty array if crypto is not iterable
               }
             
               return [...crypto].sort((a, b) => {
                 const first = a[sortDescriptor.column as keyof ICryptoData];
                 const second = b[sortDescriptor.column as keyof ICryptoData];
             
                 // Ensure the values being compared are of type number or string
                 // If they are strings, convert them to lower case for case-insensitive comparison
                 const firstValue = typeof first === 'string' ? first.toLowerCase() : first;
                 const secondValue = typeof second === 'string' ? second.toLowerCase() : second;
             
                 const cmp = firstValue < secondValue ? -1 : firstValue > secondValue ? 1 : 0;
                 
                 return sortDescriptor.direction === "descending" ? -cmp : cmp;
               });
             }, [sortDescriptor, crypto]);
             
             
             const renderCell = React.useCallback((cryptoItem: ICryptoData, columnKey: React.Key) => {
               const cellValue = cryptoItem[columnKey as keyof ICryptoData];
             
               switch (columnKey) {
                 case "name":
                   // Assuming you want to display the name of the cryptocurrency
                   return <span>{cellValue}</span>;
             
                 case "priceUsd":
                   // Display the price in USD
                   return <span>${cellValue}</span>;
             
                 case "status":
                   // Placeholder for status. Adapt this based on your logic

                   return (
                     <Chip className="capitalize" color={statusColorMap[status]} size="sm" variant="flat">
                       {status}
                     </Chip>
                   );
             
                 case "actions":
                   // Actions for each cryptocurrency item
                   return (
                     <div className="relative flex justify-end items-center gap-2">
                       <Dropdown>
                         <DropdownTrigger>
                           <Button isIconOnly size="sm" variant="light">
                             <VerticalDotsIcon className="text-default-300" />
                           </Button>
                         </DropdownTrigger>
                         <DropdownMenu>
                           <DropdownItem >View Details</DropdownItem>
                           <DropdownItem>Edit</DropdownItem>
                           <DropdownItem>Delete</DropdownItem>
                         </DropdownMenu>
                       </Dropdown>
                     </div>
                   );
             
                 default:
                   // For other columns, display the value directly
                   return <span>{cellValue}</span>;
               }
             }, []); 

             const onNextPage = React.useCallback(() => {
               if (page < pages) {
                 setPage(page + 1);
               }
             }, [page, pages]);
           
             const onPreviousPage = React.useCallback(() => {
               if (page > 1) {
                 setPage(page - 1);
               }
             }, [page]);


             const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
               setRowsPerPage(Number(e.target.value));
               setPage(1);
             }, []);
           
             const onSearchChange = React.useCallback((value?: string) => {
               if (value) {
                 setFilterValue(value);
                 setPage(1);
               } else {
                 setFilterValue("");
               }
             }, []);
           

             const onClear = React.useCallback(()=>{
               setFilterValue("")
               setPage(1)
             },[])

             function capitalize(str: string) {
               return str.charAt(0).toUpperCase() + str.slice(1);
             }
             
              
             const topContent = React.useMemo(() => {
               
               const totalCryptos = Array.isArray(crypto) ? crypto.length : 0;

               return (
                 <div className="flex flex-col gap-4">
                   <div className="flex justify-between gap-3 items-end">
                     <Input
                       isClearable
                       className="w-full sm:max-w-[44%]"
                       placeholder="Search by name..."
                       startContent={<SearchIcon />}
                       value={filterValue}
                       onClear={() => onClear()}
                       onValueChange={onSearchChange}
                     />
                     <div className="flex gap-3">
                       <Dropdown>
                         <DropdownTrigger className="hidden sm:flex">
                           <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                             Status
                           </Button>
                         </DropdownTrigger>
                         <DropdownMenu
                           disallowEmptySelection
                           aria-label="Table Columns"
                           closeOnSelect={false}
                           selectedKeys={statusFilter}
                           selectionMode="multiple"
                           onSelectionChange={setStatusFilter}
                         >
                           {statusOptions.map((status) => (
                             <DropdownItem key={status.uid} className="capitalize">
                               {capitalize(status.name)}
                             </DropdownItem>
                           ))}
                         </DropdownMenu>
                       </Dropdown>
                       <Dropdown>
                         <DropdownTrigger className="hidden sm:flex">
                           <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                             Columns
                           </Button>
                         </DropdownTrigger>
                         <DropdownMenu
                           disallowEmptySelection
                           aria-label="Table Columns"
                           closeOnSelect={false}
                           selectedKeys={visibleColumns}
                           selectionMode="multiple"
                           onSelectionChange={setVisibleColumns}
                         >
                           {columns.map((column) => (
                             <DropdownItem key={column.uid} className="capitalize">
                               {capitalize(column.name)}
                             </DropdownItem>
                           ))}
                         </DropdownMenu>
                       </Dropdown>
                       <Button color="primary" endContent={<PlusIcon />}>
                         Add New
                       </Button>
                     </div>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-default-400 text-small">Total</span>
                     <label className="flex items-center text-default-400 text-small">
                       Rows per page:
                       <select
                         className="bg-transparent outline-none text-default-400 text-small"
                         onChange={onRowsPerPageChange}
                       >
                         <option value="5">5</option>
                         <option value="10">10</option>
                         <option value="15">15</option>
                       </select>
                     </label>
                   </div>
                 </div>
               );
             }, [filterValue, onSearchChange, statusFilter, visibleColumns, crypto, onRowsPerPageChange, onClear]);


             const bottomContent = React.useMemo(() => {
               return (
                 <div className="py-2 px-2 flex justify-between items-center">
                   <span className="w-[30%] text-small text-default-400">
                     {selectedKeys === "all"
                       ? "All items selected"
                       : `${selectedKeys.size} of ${filteredItems.length} selected`}
                   </span>
                   <Pagination
                     isCompact
                     showControls
                     showShadow
                     color="primary"
                     page={page}
                     total={pages}
                     onChange={setPage}
                   />
                   <div className="hidden sm:flex w-[30%] justify-end gap-2">
                     <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                       Previous
                     </Button>
                     <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                       Next
                     </Button>
                   </div>
                 </div>
               );
             }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);



      // Admin
     useEffect(() => {
          const checkAdminRole = async () => {
               try {
                    const response = await axiosInstance.get("/check-admin");
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
                         console.error('Error:', error);
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

     if (!isAdmin) {
          return <p>Checking admin status...</p>; // Render this until admin status is confirmed
     }


     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error loading data</p>;
     if (!crypto) return (
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
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        );
}

export default AdminDashboard;
