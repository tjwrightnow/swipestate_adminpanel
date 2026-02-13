"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useLogoutHandler } from "@/models/Auth/Auth";
import { RefreshToken } from "@/utils/Storage/Storage";

interface DashboardLayoutProps {
   children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const params = usePathname();

   const menuItems = [
      // {id: "dashboard", icon: "📊", label: "Dashboard", href: "/dashboard"},
      // { id: "users", icon: "👥", label: "Users", href: "/users" },
      { id: "buyers", icon: "👥", label: "Buyers", href: "/buyers" },
      { id: "sellers", icon: "🏢", label: "Sellers", href: "/sellers" },
      { id: "properties", icon: "🏠", label: "Properties", href: "/properties" },
      { id: "plan-management", icon: "📋", label: "Plan Management", href: "/plan-management" },
      { id: "profile", icon: "👤", label: "Profile", href: "/profile" },
   ];
   const refreshToken = RefreshToken;
   console.log(refreshToken);
   // Logout API
   const { Logout } = useLogoutHandler();
   const handleLogout = () => {
      Logout(refreshToken);
   };
   return (
      <div className="min-h-screen bg-secondary">
         {/* Header */}
         <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40 h-16">
            <div className="flex items-center justify-between h-full px-6">
               {/* Left Section - Logo & Menu Toggle */}
               <div className="flex items-center gap-4">
                  <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors xl:hidden">
                     <span className="text-2xl">{isSidebarOpen ? "✕" : "☰"}</span>
                  </button>

                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-secondary rounded-full flex justify-center items-center relative">
                        <span className="text-2xl">🏠</span>
                     </div>
                     <h1 className="text-xl font-bold text-primary hidden sm:block">Swipe Estate</h1>
                  </div>
               </div>

               {/* Right Section - Search & Profile */}
               <div className="flex items-center gap-4">
                  {/* Search Bar */}
                  <div className="hidden md:flex items-center bg-lightgray rounded-lg px-4 py-2 w-64">
                     <span className="text-gray mr-2">🔍</span>
                     <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full text-textColor" />
                  </div>

                  {/* Notifications */}
                  <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                     <span className="text-xl">🔔</span>
                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Profile Dropdown */}
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
                     <div className="w-9 h-9 bg-primary rounded-full flex justify-center items-center">
                        <span className="text-white text-sm font-semibold">AD</span>
                     </div>
                     <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-black">Admin User</p>
                        <p className="text-xs text-gray">Super Admin</p>
                     </div>
                     <span className="text-gray hidden sm:block">▼</span>
                  </div>
               </div>
            </div>
         </header>

         {/* Sidebar */}
         <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-30 ${isSidebarOpen ? "w-64" : "w-0 xl:w-20"} overflow-hidden`}>
            <nav className="p-4 space-y-2">
               {menuItems.map((item) => (
                  <Link key={item.id} href={item.href} className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer ${params.replace("/", "") === item.id ? "bg-primary text-white" : "text-textColor hover:bg-secondary"}`}>
                     <span className="text-2xl min-w-[24px]">{item.icon}</span>
                     <span className={`font-medium ${isSidebarOpen ? "block" : "hidden lg:hidden"}`}>{item.label}</span>
                  </Link>
               ))}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
               <button className="flex items-center gap-4 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all w-full" onClick={handleLogout}>
                  <span className="text-2xl">🚪</span>
                  <span className={`font-medium ${isSidebarOpen ? "block" : "hidden xl:hidden"}`}>Logout</span>
               </button>
            </div>
         </aside>

         {/* Main Content */}
         <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? "xl:pl-64" : "xl:pl-20"}`}>
            <div className="p-6">{children}</div>
         </main>

         {/* Mobile Overlay */}
         {isSidebarOpen && <div className="fixed inset-0 bg-gray-600/30 bg-opacity-50 z-20 xl:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
      </div>
   );
};

export default DashboardLayout;
