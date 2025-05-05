import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Bookings Summary Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Bookings</h3>
          <div className="mt-2 flex items-baseline gap-x-2">
            <span className="text-3xl font-bold tracking-tight text-indigo-600">12</span>
            <span className="text-sm text-gray-500">bookings this month</span>
          </div>
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all bookings
            </a>
          </div>
        </div>

        {/* Status Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Account Status</h3>
          <div className="mt-2 flex items-baseline gap-x-2">
            <span className="text-3xl font-bold tracking-tight text-green-600">Active</span>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              Your account is in good standing
            </span>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Quick Actions</h3>
          <div className="mt-4 space-y-3">
            <button
              type="button"
              className="w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Create New Booking
            </button>
            <button
              type="button"
              className="w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Recent Activity</h3>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <li key={item} className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 truncate">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-indigo-600">Booking #{1000 + item}</p>
                      <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Confirmed
                      </span>
                    </div>
                    <p className="truncate text-sm text-gray-500">Created on May {10 + item}, 2023</p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 