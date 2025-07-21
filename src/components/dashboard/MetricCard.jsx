import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const colorSchemes = {
  blue: "from-blue-500 to-blue-600",
  green: "from-emerald-500 to-emerald-600", 
  purple: "from-purple-500 to-purple-600",
  emerald: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600"
};

export default function MetricCard({ title, value, change, trend, icon: Icon, color = "blue" }) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorSchemes[color]} opacity-5`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <div className="flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                trend === "up" ? "text-emerald-600" : "text-red-600"
              }`}>
                {change}
              </span>
              <span className="text-sm text-slate-500">vs last month</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorSchemes[color]} shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}