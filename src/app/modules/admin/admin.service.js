"use client";

import {
  Users,
  BookOpen,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

const stats = [
  {
    title: "Users",
    value: 125,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Books",
    value: 54,
    icon: BookOpen,
    color: "bg-orange-500",
  },
  {
    title: "Sales",
    value: 320,
    icon: ShoppingBag,
    color: "bg-purple-500",
  },
  {
    title: "Revenue",
    value: "$2,450",
    icon: DollarSign,
    color: "bg-green-500",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-6"
            >
              <div
                className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}
              >
                <Icon />
              </div>

              <h2 className="mt-5 text-gray-500">
                {item.title}
              </h2>

              <h1 className="text-4xl font-bold mt-2">
                {item.value}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}