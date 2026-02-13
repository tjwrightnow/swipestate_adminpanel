"use client";

import React, { useState } from "react";
import { Download, X } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Table from "@/components/Table/Table";
import { useRouter } from "next/navigation";
import { useGetSellerHandler } from "@/models/Users/Users";
import { useGetApartmentHandler, useUpdateApartmentHandler } from "@/models/Apartment/Apartment";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface User {
   _id: string;
   name: string;
   email: string;
   phone: string;
   address: string;
}

const Properties: React.FC = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
   const [isViewMode, setIsViewMode] = useState(false);
   const [isEditMode, setIsEditMode] = useState(false);
   const [isDeleteMode, setIsDeleteMode] = useState(false);
   const [deleteUserId, setDeleteUserId] = useState<string>("");
   const router = useRouter();

   const { ApartmentData, ApartmentLoading } = useGetApartmentHandler({ page: currentPage });

   // Update API
   const { handleUpdateApartment, isError, isLoading } = useUpdateApartmentHandler();

   const handleUpdateStatus = ({ propertyId, sellerId, status }: { propertyId: string; sellerId: string; status: string }) => {
      handleUpdateApartment({ propertyId, sellerId, status });
   };

   const columns = [
      {
         key: "title",
         header: "Title",
         type: "text",
         name: "title",
      },
      {
         key: "location",
         header: "Location",
         type: "text",
      },
      {
         key: "price",
         header: "Price",
         type: "number",
      },
      {
         key: "bedrooms",
         header: "Bedrooms",
         type: "number",
      },
      {
         key: "bathrooms",
         header: "Bathrooms",
         type: "number",
      },
      {
         key: "area",
         header: "Area (sqft)",
         type: "number",
      },
      {
         key: "furnished",
         header: "Furnished",
         type: "text",
      },
      {
         key: "floor",
         header: "Floor",
         type: "number",
      },
      {
         key: "parking",
         header: "Parking",
         type: "boolean",
         render: (value: boolean) => (value ? "Yes" : "No"),
      },
      {
         key: "balcony",
         header: "Balcony",
         type: "boolean",
         render: (value: boolean) => (value ? "Yes" : "No"),
      },
      {
         key: "amenities",
         header: "Amenities",
         type: "array",
         render: (value: string[]) => value.join(", "),
      },
      {
         key: "proof_of_ownership",
         header: "Proof of Ownership",
         type: "text",
         render: (value: string) => (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500">
               <Download className="w-5 h-5 inline-block mr-1" />
            </a>
         ),
      },

      {
         mapKey: "2",
         header: "Status",
         render: (value: string, item: any) => (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline">{item?.status ? item?.status : "No Status"}</Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuGroup>
                     <DropdownMenuItem onClick={() => handleUpdateStatus({ propertyId: item?._id, sellerId: item?.sellerId, status: "Active" })}>Active</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleUpdateStatus({ propertyId: item?._id, sellerId: item?.sellerId, status: "Inactive" })}>Inactive</DropdownMenuItem>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         ),
      },
   ];

   const handleViewClick = (user: User) => {
      setSelectedUser(user);
      setIsViewMode(true);
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
   console.log(ApartmentData);

   return (
      <DashboardLayout>
         {/* Page Header */}
         <div className="mb-6">
            <h1 className="text-3xl font-bold text-black mb-2">Properties Management</h1>
            <p className="text-textColor">Manage all properties and their information</p>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex justify-center items-center">
                     <span className="text-2xl">🏢</span>
                  </div>
               </div>
               <h3 className="text-gray text-sm mb-1">Total Properties</h3>
               <p className="text-2xl font-bold text-black">{ApartmentData?.meta?.totalItems ?? 0}</p>
            </div>
         </div>

         {/* Users Table */}
         <Table tableName="All Properties" data={ApartmentData?.apartments || []} columns={columns} keyField="_id" statusField="status" currentPage={currentPage} setCurrentPage={setCurrentPage} pageLimit={6} numberOfPages={ApartmentData?.meta?.totalPages ?? 1} dataLength={ApartmentData?.meta?.totalItems ?? 0} isLoading={ApartmentLoading} loadingLength={5} onViewClick={(user: any) => handleViewClick(user)} setId={setDeleteUserId} deleteFunctions={() => setIsDeleteMode(true)} actions={false} />

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
                                 <label className="text-sm font-semibold text-gray mb-2 block">Address</label>
                                 <p className="text-black font-medium">{selectedUser.address}</p>
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
                     <button className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">Delete</button>
                  </div>
               </div>
            </div>
         )}
      </DashboardLayout>
   );
};

export default Properties;
