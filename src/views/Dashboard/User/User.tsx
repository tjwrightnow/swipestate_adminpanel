"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Table from "@/components/Table/Table";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  apartment: string;
  status: string;
  joinedDate: string;
  properties: number;
  avatar?: string;
}

const User: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Sample data - Replace with your API call
  const usersData: User[] = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      role: "Agent",
      apartment: "Agent",
      status: "Active",
      joinedDate: "2024-01-15",
      properties: 12,
    },
    {
      _id: "2",
      name: "Sarah Smith",
      email: "sarah.smith@example.com",
      phone: "+1 234 567 8901",
      role: "Buyer",
      apartment: "Buyer",
      status: "Active",
      joinedDate: "2024-02-20",
      properties: 3,
    },
    {
      _id: "3",
      name: "Mike Johnson",
      email: "mike.j@example.com",
      phone: "+1 234 567 8902",
      role: "Seller",
      apartment: "Seller",
      status: "Inactive",
      joinedDate: "2024-01-10",
      properties: 8,
    },
    {
      _id: "4",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 234 567 8903",
      role: "Agent",
      apartment: "Agent",
      status: "Active",
      joinedDate: "2024-03-05",
      properties: 15,
    },
    {
      _id: "5",
      name: "David Wilson",
      email: "david.w@example.com",
      phone: "+1 234 567 8904",
      role: "Buyer",
      apartment: "Buyer",
      status: "Active",
      joinedDate: "2024-02-12",
      properties: 2,
    },
  ];

  const columns = [
    {
      key: "name",
      header: "Name",
      search: true,
      type: "text",
      name: "name",
      render: (value: string, item: User) => (
        <div className="flex items-center gap-3 pl-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm ">{value.charAt(0).toUpperCase()}</div>
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      search: true,
      type: "email",
      name: "email",
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "role",
      header: "Role",
      select: ["Agent", "Buyer", "Seller"],
      displayName: "All Roles",
    },
    {
      key: "apartment",
      header: "Apartment",
      render: (item: any) => {
        return (
          item === "Agent" && (
            <div className="flex items-center justify-center">
              <Button className="bg-primary" name={"View"} onClick={() => router.push(`/users/apartments/${item}`)} />
            </div>
          )
        );
      },
    },
    {
      key: "status",
      header: "Status",
      select: ["Active", "Inactive"],
      displayName: "All Status",
      render: (value: string) => <span className={`px-3 py-1 rounded-full text-xs font-semibold ${value === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{value}</span>,
    },
    {
      key: "properties",
      header: "Properties",
      render: (value: number) => <span className="font-semibold text-primary">{value}</span>,
    },
    {
      key: "joinedDate",
      header: "Joined Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
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

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditMode(true);
    setIsModalOpen(true);
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
        <h1 className="text-3xl font-bold text-black mb-2">Users Management</h1>
        <p className="text-textColor">Manage all users and their information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex justify-center items-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <h3 className="text-gray text-sm mb-1">Total Users</h3>
          <p className="text-2xl font-bold text-black">{usersData.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex justify-center items-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <h3 className="text-gray text-sm mb-1">Active Users</h3>
          <p className="text-2xl font-bold text-black">{usersData.filter((u) => u.status === "Active").length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex justify-center items-center">
              <span className="text-2xl">🏢</span>
            </div>
          </div>
          <h3 className="text-gray text-sm mb-1">Agents</h3>
          <p className="text-2xl font-bold text-black">{usersData.filter((u) => u.role === "Agent").length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex justify-center items-center">
              <span className="text-2xl">🛒</span>
            </div>
          </div>
          <h3 className="text-gray text-sm mb-1">Buyers</h3>
          <p className="text-2xl font-bold text-black">{usersData.filter((u) => u.role === "Buyer").length}</p>
        </div>
      </div>

      {/* Users Table */}
      <Table tableName="All Users" data={usersData} columns={columns} keyField="_id" statusField="status" currentPage={currentPage} setCurrentPage={setCurrentPage} pageLimit={10} dataLength={usersData.length} isLoading={isLoading} onViewClick={(user: any) => handleViewClick(user)} onEditClick={(user: any) => handleEditClick(user)} setId={setDeleteUserId} deleteFunctions={() => setIsDeleteMode(true)} actions={true} eye={true} edit={true} trash={true} isBtn={true} BtnName="Add User" BtnClick={handleAddUser} />

      {/* View/Edit Modal */}
      {isModalOpen && (isViewMode || isEditMode) && (
        <div className="fixed inset-0 bg-gray-600/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-black">{isViewMode ? "View User" : selectedUser ? "Edit User" : "Add User"}</h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                      {isEditMode && !isViewMode ? <input type="text" value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary" /> : <p className="text-black font-medium">{selectedUser.name}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray mb-2 block">Email</label>
                      {isEditMode && !isViewMode ? <input type="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary" /> : <p className="text-black font-medium">{selectedUser.email}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray mb-2 block">Phone</label>
                      {isEditMode && !isViewMode ? <input type="tel" value={selectedUser.phone} onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary" /> : <p className="text-black font-medium">{selectedUser.phone}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray mb-2 block">Role</label>
                      {isEditMode && !isViewMode ? (
                        <select value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary">
                          <option value="Agent">Agent</option>
                          <option value="Buyer">Buyer</option>
                          <option value="Seller">Seller</option>
                        </select>
                      ) : (
                        <p className="text-black font-medium">{selectedUser.role}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray mb-2 block">Status</label>
                      {isEditMode && !isViewMode ? (
                        <select value={selectedUser.status} onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary">
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${selectedUser.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{selectedUser.status}</span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray mb-2 block">Properties</label>
                      <p className="text-black font-medium">{selectedUser.properties}</p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray mb-2 block">Joined Date</label>
                      <p className="text-black font-medium">{new Date(selectedUser.joinedDate).toLocaleDateString()}</p>
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
                <button onClick={handleCloseModal} className="px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSaveUser} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
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
              <button onClick={handleDeleteClick} className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default User;
