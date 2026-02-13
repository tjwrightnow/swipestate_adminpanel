"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {User, Mail, Shield, Calendar, Edit2, Save, X, Camera, Lock, ArrowLeft} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";

export interface UserProfile {
	_id: string;
	username: string;
	email: string;
	role: string;
	createdAt: string;
	avatar?: string;
	phone?: string;
	bio?: string;
	address?: string;
}

// Sample user data
const initialUser: UserProfile = {
	_id: "696c0ba4b60a6924061ea168",
	username: "admin",
	email: "admin@gmail.com",
	role: "Admin",
	createdAt: "2026-01-17T22:22:28.475Z",
	phone: "+1 (555) 123-4567",
	bio: "Real estate professional with 10+ years of experience in property management and sales.",
	address: "New York, NY, United States",
};

export default function ProfilePage() {
	const [user, setUser] = useState<UserProfile>(initialUser);
	const [isEditing, setIsEditing] = useState(false);
	const [editedUser, setEditedUser] = useState<UserProfile>(initialUser);
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const handleEdit = () => {
		setIsEditing(true);
		setEditedUser(user);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedUser(user);
	};

	const handleSave = () => {
		setUser(editedUser);
		setIsEditing(false);
		alert("Profile updated successfully!");
	};

	const handlePasswordChange = (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			alert("New passwords do not match!");
			return;
		}
		alert("Password changed successfully!");
		setIsChangingPassword(false);
		setPasswordData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
	};

	const getRoleBadgeColor = (role: string) => {
		switch (role.toLowerCase()) {
			case "admin":
				return "bg-red-500";
			case "agent":
				return "bg-green-500";
			case "user":
				return "bg-blue-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<div className="min-h-screen bg-[#FFFDFE]">
			<DashboardLayout>
				{/* Header */}
				<header className="bg-white shadow-sm sticky top-16 ">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
							<div className="flex items-center gap-4">
								{/* <Link href="/">
									<button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-400 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
										<ArrowLeft className="w-5 h-5" />
										<span className="hidden sm:inline">Back</span>
									</button>
								</Link> */}
								<div>
									<h1 className="text-2xl sm:text-3xl font-bold text-[#38B6FF]">Profile Settings</h1>
								</div>
							</div>

							{/* {!isEditing && (
                        <button onClick={handleEdit} className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#38B6FF] text-white rounded-lg font-semibold hover:bg-[#2A9FE8] transition-colors w-full sm:w-auto justify-center">
                           <Edit2 className="w-5 h-5" />
                           Edit Profile
                        </button>
                     )} */}
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
					<div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 lg:gap-8">
						{/* Left Column - Profile Card */}
						<div className="order-1">
							<div className="bg-white rounded-xl p-6 sm:p-8 shadow-md text-center lg:sticky lg:top-42">
								{/* Avatar */}
								<div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6">
									<div className="w-full h-full rounded-full bg-[#38B6FF] flex items-center justify-center overflow-hidden border-4 border-[#FFFDFE]">
										{user.avatar ? (
											<Image
												src={user.avatar}
												alt={user.username}
												fill
												className="object-cover"
											/>
										) : (
											<span className="text-5xl sm:text-6xl font-bold text-white">{user.username.charAt(0).toUpperCase()}</span>
										)}
									</div>
									{isEditing && (
										<div className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#38B6FF] flex items-center justify-center cursor-pointer border-3 border-white hover:bg-[#2A9FE8] transition-colors">
											<Camera className="w-5 h-5 text-white" />
										</div>
									)}
								</div>

								{/* Username */}
								<h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">{user.username}</h2>

								{/* Role Badge */}
								<div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${getRoleBadgeColor(user.role)} text-white text-sm font-semibold mb-6`}>
									<Shield className="w-4 h-4" />
									{user.role}
								</div>

								{/* Member Since */}
								<div className="p-4 bg-[#FFFDFE] rounded-lg mt-6">
									<div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
										<Calendar className="w-4 h-4" />
										<span>Member since {formatDate(user.createdAt)}</span>
									</div>
								</div>

								{/* User ID */}
								<div className="mt-4 p-4 bg-[#FFFDFE] rounded-lg">
									<div className="text-xs text-gray-400 mb-1">User ID</div>
									<div className="text-xs sm:text-sm text-gray-600 font-mono break-all">{user._id}</div>
								</div>
							</div>
						</div>

						{/* Right Column - Details */}
						<div className="flex flex-col gap-6 order-2">
							{/* Personal Information */}
							<div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
								<div className="flex justify-between items-center mb-6">
									<h3 className="text-xl sm:text-2xl font-semibold text-black">Personal Information</h3>
								</div>

								<div className="grid gap-6">
									{/* Username */}
									<div>
										<label className="flex items-center gap-2 mb-2 text-black font-semibold text-sm sm:text-base">
											<User className="w-4 h-4 sm:w-5 sm:h-5 text-[#38B6FF]" />
											Username
										</label>
										{isEditing ? (
											<input
												type="text"
												value={editedUser.username}
												onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
												className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#38B6FF] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-opacity-50"
											/>
										) : (
											<div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FFFDFE] rounded-lg text-gray-600 text-base">{user.username}</div>
										)}
									</div>

									{/* Email */}
									<div>
										<label className="flex items-center gap-2 mb-2 text-black font-semibold text-sm sm:text-base">
											<Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#38B6FF]" />
											Email
										</label>
										{isEditing ? (
											<input
												type="email"
												value={editedUser.email}
												onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
												className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#38B6FF] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-opacity-50"
											/>
										) : (
											<div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FFFDFE] rounded-lg text-gray-600 text-base">{user.email}</div>
										)}
									</div>

									{/* Phone */}
									{/* <div>
										<label className="flex items-center gap-2 mb-2 text-black font-semibold text-sm sm:text-base">Phone Number</label>
										{isEditing ? (
											<input
												type="tel"
												value={editedUser.phone || ""}
												onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
												placeholder="Enter phone number"
												className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#38B6FF] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-opacity-50"
											/>
										) : (
											<div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FFFDFE] rounded-lg text-gray-600 text-base">{user.phone || "Not provided"}</div>
										)}
									</div> */}

									{/* Address */}
									{/* <div>
										<label className="flex items-center gap-2 mb-2 text-black font-semibold text-sm sm:text-base">Address</label>
										{isEditing ? (
											<input
												type="text"
												value={editedUser.address || ""}
												onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
												placeholder="Enter address"
												className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#38B6FF] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-opacity-50"
											/>
										) : (
											<div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FFFDFE] rounded-lg text-gray-600 text-base">{user.address || "Not provided"}</div>
										)}
									</div> */}
								</div>

								{/* Action Buttons when Editing */}
								{isEditing && (
									<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 pt-6 border-t border-gray-200">
										<button
											onClick={handleCancel}
											className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-600 border-2 border-gray-400 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
										>
											<X className="w-5 h-5" />
											Cancel
										</button>
										<button
											onClick={handleSave}
											className="flex items-center justify-center gap-2 px-4 py-3 bg-[#38B6FF] text-white rounded-lg font-semibold hover:bg-[#2A9FE8] transition-colors"
										>
											<Save className="w-5 h-5" />
											Save Changes
										</button>
									</div>
								)}
							</div>

							{/* Bio Section */}
							{/* <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
								<h3 className="text-xl sm:text-2xl font-semibold text-black mb-4">Bio</h3>
								{isEditing ? (
									<textarea
										value={editedUser.bio || ""}
										onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
										placeholder="Tell us about yourself..."
										rows={4}
										className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#38B6FF] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-opacity-50 resize-y"
									/>
								) : (
									<p className="text-gray-600 leading-relaxed text-base">{user.bio || "No bio added yet."}</p>
								)}
							</div> */}

							{/* Security Section */}
							{/* {!isEditing && (
                        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
                           <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl sm:text-2xl font-semibold text-black">Security</h3>
                           </div>

                           {!isChangingPassword ? (
                              <button onClick={() => setIsChangingPassword(true)} className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-[#38B6FF] border-2 border-[#38B6FF] rounded-lg font-semibold hover:bg-[#38B6FF] hover:text-white transition-colors w-full sm:w-auto">
                                 <Lock className="w-5 h-5" />
                                 Change Password
                              </button>
                           ) : (
                              <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
                                 <div>
                                    <label className="block mb-2 text-black font-semibold text-sm sm:text-base">Current Password</label>
                                    <input type="password" required value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent" />
                                 </div>

                                 <div>
                                    <label className="block mb-2 text-black font-semibold text-sm sm:text-base">New Password</label>
                                    <input type="password" required value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent" />
                                 </div>

                                 <div>
                                    <label className="block mb-2 text-black font-semibold text-sm sm:text-base">Confirm New Password</label>
                                    <input type="password" required value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent" />
                                 </div>

                                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                                    <button
                                       type="button"
                                       onClick={() => {
                                          setIsChangingPassword(false);
                                          setPasswordData({
                                             currentPassword: "",
                                             newPassword: "",
                                             confirmPassword: "",
                                          });
                                       }}
                                       className="px-4 py-3 bg-white text-gray-600 border-2 border-gray-400 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                       Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-3 bg-[#38B6FF] text-white rounded-lg font-semibold hover:bg-[#2A9FE8] transition-colors">
                                       Update Password
                                    </button>
                                 </div>
                              </form>
                           )}
                        </div>
                     )} */}
						</div>
					</div>
				</main>
			</DashboardLayout>
		</div>
	);
}
