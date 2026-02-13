"use client";

import DashboardLayout from "@/layouts/DashboardLayout";
import { cookiesData, UserData } from "@/utils/Storage/Storage";
import React from "react";

const Home: React.FC = () => {
  const stats = [
    {
      id: 1,
      title: "Total Properties",
      value: "1,234",
      icon: "🏠",
      change: "+12%",
      changeType: "increase",
    },
    {
      id: 2,
      title: "Total Users",
      value: "5,678",
      icon: "👥",
      change: "+8%",
      changeType: "increase",
    },
    {
      id: 3,
      title: "Active Bookings",
      value: "342",
      icon: "📅",
      change: "-3%",
      changeType: "decrease",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$45,678",
      icon: "💰",
      change: "+15%",
      changeType: "increase",
    },
  ];

  const recentProperties = [
    {
      id: 1,
      name: "Modern Villa in Beverly Hills",
      location: "Los Angeles, CA",
      price: "$2,500,000",
      status: "Active",
      image: "🏡",
    },
    {
      id: 2,
      name: "Luxury Apartment Downtown",
      location: "New York, NY",
      price: "$1,200,000",
      status: "Pending",
      image: "🏢",
    },
    {
      id: 3,
      name: "Beach House Ocean View",
      location: "Miami, FL",
      price: "$3,800,000",
      status: "Active",
      image: "🏖️",
    },
    {
      id: 4,
      name: "Cozy Cottage in Suburbs",
      location: "Austin, TX",
      price: "$450,000",
      status: "Sold",
      image: "🏘️",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "booked a property",
      property: "Modern Villa",
      time: "2 hours ago",
      avatar: "👨",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "added new property",
      property: "Beach House",
      time: "5 hours ago",
      avatar: "👩",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "updated listing",
      property: "Downtown Apartment",
      time: "1 day ago",
      avatar: "👨‍💼",
    },
  ];

  console.log(UserData);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-textColor">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 bg-lightgray px-3 rounded-xl flex justify-center gap-5 items-center">
                <span className="text-2xl">{stat.icon}</span>
                <h3 className="text-gray text-sm">{stat.title}</h3>
              </div>
              <span className={`text-sm font-semibold ${stat.changeType === "increase" ? "text-green-500" : "text-red-500"}`}>{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Properties & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Properties */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">Recent Properties</h2>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 bg-secondary rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex justify-center items-center text-2xl">{property.image}</div>
                  <div>
                    <h3 className="font-semibold text-black">{property.name}</h3>
                    <p className="text-sm text-gray">{property.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{property.price}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${property.status === "Active" ? "bg-green-100 text-green-600" : property.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-gray-200 text-gray-600"}`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-black mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex justify-center items-center text-xl flex-shrink-0">{activity.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm text-black">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-primary">{activity.property}</p>
                  <p className="text-xs text-gray mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
