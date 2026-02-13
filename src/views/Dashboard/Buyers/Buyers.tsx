"use client";

import React, {useState} from "react";
import {X} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Table from "@/components/Table/Table";
import {useRouter} from "next/navigation";
import {useGetBuyerHandler} from "@/models/Users/Users";

interface User {
	_id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	selectedIncome: string;
}

const Buyers: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isViewMode, setIsViewMode] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const [deleteUserId, setDeleteUserId] = useState<string>("");
	const router = useRouter();

	const {BuyerData, BuyerLoading} = useGetBuyerHandler({page: currentPage});

	const columns = [
		{
			key: "name",
			header: "Name",
			type: "text",
			name: "name",
		},
		{
			key: "email",
			header: "Email",
			type: "email",
			name: "email",
		},
		{
			key: "address",
			header: "Address",
			type: "text",
			name: "address",
		},
		{
			key: "phone",
			header: "Phone",
		},
		{
			key: "selectedIncome",
			header: "Selected Income",
		},
	];

	const handleViewClick = (user: User) => {
		setSelectedUser(user);
		setIsViewMode(true);
		setIsModalOpen(true);
	};

	const handleEditClick = (user: User) => {
		setSelectedUser(user);
		setIsEditMode(true);
		setIsModalOpen(true);
	};

	const handleDeleteClick = () => {
		console.log("Deleting user:", deleteUserId);
		setIsDeleteMode(false);
		setDeleteUserId("");
		// Add your delete API call here
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsViewMode(false);
		setIsEditMode(false);
		setSelectedUser(null);
	};

	const handleSaveUser = () => {
		console.log("Saving user:", selectedUser);
		// Add your save/update API call here
		handleCloseModal();
	};

	return (
		<DashboardLayout>
			{/* Page Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-black mb-2">Buyers Management</h1>
				<p className="text-textColor">Manage all buyers and their information</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 mb-6">
				<div className="bg-white rounded-2xl p-6 shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<div className="w-12 h-12 bg-blue-100 rounded-xl flex justify-center items-center">
							<span className="text-2xl">👥</span>
						</div>
					</div>
					<h3 className="text-gray text-sm mb-1">Total Buyers</h3>
					<p className="text-2xl font-bold text-black">{BuyerData?.meta?.totalItems ?? 0}</p>
				</div>
			</div>

			{/* Users Table */}
			<Table
				tableName="All Buyers"
				data={BuyerData?.users || []}
				columns={columns}
				keyField="_id"
				statusField="status"
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				pageLimit={6}
				numberOfPages={BuyerData?.meta?.totalPages ?? 1}
				dataLength={BuyerData?.meta?.totalItems ?? 0}
				isLoading={BuyerLoading}
				loadingLength={5}
				onViewClick={(user: any) => handleViewClick(user)}
				onEditClick={(user: any) => handleEditClick(user)}
				setId={setDeleteUserId}
				deleteFunctions={() => setIsDeleteMode(true)}
				actions={true}
				eye={true}
				edit={false}
				trash={false}
			/>

			{/* View/Edit Modal */}
			{isModalOpen && (isViewMode || isEditMode) && (
				<div className="fixed inset-0 bg-gray-600/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
						{/* Modal Header */}
						<div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
							<h2 className="text-2xl font-bold text-black">View Buyer</h2>
							<button
								onClick={handleCloseModal}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6">
							{selectedUser && (
								<div className="space-y-6">
									{/* User Avatar */}
									<div className="flex justify-center">
										<div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">{selectedUser.name.charAt(0).toUpperCase()}</div>
									</div>

									{/* User Details */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="text-sm font-semibold text-gray mb-2 block">Full Name</label>
											{isEditMode && !isViewMode ? (
												<input
													type="text"
													value={selectedUser.name}
													onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
													className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
												/>
											) : (
												<p className="text-black font-medium">{selectedUser.name}</p>
											)}
										</div>

										<div>
											<label className="text-sm font-semibold text-gray mb-2 block">Email</label>
											{isEditMode && !isViewMode ? (
												<input
													type="email"
													value={selectedUser.email}
													onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
													className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
												/>
											) : (
												<p className="text-black font-medium">{selectedUser.email}</p>
											)}
										</div>

										<div>
											<label className="text-sm font-semibold text-gray mb-2 block">Phone</label>
											{isEditMode && !isViewMode ? (
												<input
													type="tel"
													value={selectedUser.phone}
													onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
													className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
												/>
											) : (
												<p className="text-black font-medium">{selectedUser.phone}</p>
											)}
										</div>

										<div>
											<label className="text-sm font-semibold text-gray mb-2 block">Address</label>
											<p className="text-black font-medium">{selectedUser.address}</p>
										</div>

										<div>
											<label className="text-sm font-semibold text-gray mb-2 block">Selected Income</label>
											<p className="text-black font-medium">{selectedUser.selectedIncome}</p>
										</div>
									</div>
								</div>
							)}

							{!selectedUser && isEditMode && (
								<div className="space-y-4">
									<p className="text-center text-gray">Add new user form here</p>
								</div>
							)}
						</div>

						{/* Modal Footer */}
						{isEditMode && !isViewMode && (
							<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3 justify-end rounded-b-2xl">
								<button
									onClick={handleCloseModal}
									className="px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={handleSaveUser}
									className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
								>
									{selectedUser ? "Update User" : "Add User"}
								</button>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{isDeleteMode && (
				<div className="fixed inset-0 bg-gray-600/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl w-full max-w-md p-6">
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-3xl">⚠️</span>
							</div>
							<h2 className="text-2xl font-bold text-black mb-2">Delete User</h2>
							<p className="text-gray">Are you sure you want to delete this user? This action cannot be undone.</p>
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => {
									setIsDeleteMode(false);
									setDeleteUserId("");
								}}
								className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleDeleteClick}
								className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default Buyers;
