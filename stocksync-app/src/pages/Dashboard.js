import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-b-xl p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-yellow-400 font-semibold">Welcome back!</p>
            <h1 className="text-4xl font-bold mt-2">Your Spare Parts Marketplace</h1>
            <p className="mt-2 text-lg max-w-2xl">
              Turn excess inventory into revenue. Connect with companies worldwide to buy, sell, 
              and trade industrial spare parts efficiently.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex flex-col gap-3 w-full sm:w-auto">
            <Link
              to="/add-part"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 text-center"
            >
              + List New Part
            </Link>
            <Link
              to="/browse-parts"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 text-center"
            >
              Browse Parts
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 font-semibold">MY ACTIVE LISTINGS</p>
          <h2 className="text-3xl font-bold mt-2">6</h2>
          <p className="text-sm text-blue-600 mt-1">6 total</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 font-semibold">TOTAL INVENTORY VALUE</p>
          <h2 className="text-3xl font-bold mt-2">$8,434.83</h2>
          <p className="text-sm text-green-600 mt-1">Based on listed prices</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 font-semibold">PARTS IN MARKETPLACE</p>
          <h2 className="text-3xl font-bold mt-2">6</h2>
          <p className="text-sm text-purple-600 mt-1">Updated hourly</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 font-semibold">RECENT ACTIVITY</p>
          <h2 className="text-3xl font-bold mt-2">6</h2>
          <p className="text-sm text-orange-600 mt-1">New this week</p>
        </div>
      </div>

      {/* Recent & Featured Parts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
        {/* Recent Parts */}
        <div className="bg-white rounded-lg shadow p-6 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-yellow-500">★</span> Recent Parts Listed
            </h2>
            <button className="text-blue-600 hover:underline">View All →</button>
          </div>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Medical Grade Power Supply</h3>
                <p className="text-sm text-gray-500">TDK-Lambda · Model: MPS-65-24</p>
              </div>
              <span className="text-green-600 font-semibold">$125</span>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">ABB VFD Drive ACS580</h3>
                <p className="text-sm text-gray-500">ABB · Model: ACS580-01-026A-4</p>
              </div>
              <span className="text-blue-600 font-semibold">For trade</span>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Honeywell Thermostat Controller</h3>
                <p className="text-sm text-gray-500">Honeywell · T6 Pro WiFi</p>
              </div>
              <span className="text-green-600 font-semibold">$89.99</span>
            </div>
          </div>
        </div>

        {/* Featured Parts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-yellow-500">★</span> Featured Parts
            </h2>
            <button className="text-blue-600 hover:underline">See More →</button>
          </div>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">ABB VFD Drive ACS580</h3>
              <p className="text-sm text-gray-500">ABB</p>
              <span className="block text-blue-600 mt-1">For trade</span>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Siemens S7-1200 CPU 1214C</h3>
              <p className="text-sm text-gray-500">Siemens</p>
              <span className="block text-green-600 mt-1">$285.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
