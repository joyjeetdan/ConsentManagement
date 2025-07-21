import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Shield, Users, AlertTriangle } from "lucide-react";

const COLORS = {
  granted: '#10B981',
  withdrawn: '#EF4444', 
  pending: '#F59E0B'
};

export default function ConsentOverview({ records }) {
  const consentStats = records.reduce((acc, record) => {
    acc[record.consent_status] = (acc[record.consent_status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(consentStats).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: COLORS[status]
  }));

  const sourceStats = records.reduce((acc, record) => {
    acc[record.source_platform] = (acc[record.source_platform] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5 text-blue-500" />
          Consent Intelligence Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Consent Status Distribution */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-700">Status Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-700">Data Sources</h4>
          <div className="space-y-2">
            {Object.entries(sourceStats).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {source.replace('_', ' ')}
                </Badge>
                <span className="text-sm font-medium text-slate-600">
                  {count} records
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">{records.length}</div>
            <div className="text-xs text-slate-500">Total Records</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">
              {Math.round((consentStats.granted || 0) / records.length * 100)}%
            </div>
            <div className="text-xs text-slate-500">Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {Object.keys(sourceStats).length}
            </div>
            <div className="text-xs text-slate-500">Sources</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}