import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, BarChart } from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

export default function PerformanceChart({ data }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Campaign Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Line 
                type="monotone" 
                dataKey="roi" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-sm text-slate-500">Avg ROI</div>
            <div className="text-xl font-bold text-green-600">
              {(data.reduce((sum, d) => sum + d.roi, 0) / data.length).toFixed(1)}x
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-500">Total Conversions</div>
            <div className="text-xl font-bold text-blue-600">
              {data.reduce((sum, d) => sum + d.conversions, 0).toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-500">Total Spend</div>
            <div className="text-xl font-bold text-slate-900">
              ${data.reduce((sum, d) => sum + d.spend, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}