
import React, { useState, useEffect } from "react";
import { ConsentRecord, CampaignData, PlatformSync, IntelligenceSignal } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Zap, 
  DollarSign, 
  Users, 
  Target,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

import MetricCard from "../components/dashboard/MetricCard";
import ConsentOverview from "../components/dashboard/ConsentOverview";
import PlatformStatus from "../components/dashboard/PlatformStatus";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import IntelligenceFeed from "../components/dashboard/IntelligenceFeed";

const mockPerformanceData = [
  { date: 'Jan', spend: 45000, conversions: 890, roi: 3.2 },
  { date: 'Feb', spend: 52000, conversions: 1120, roi: 3.8 },
  { date: 'Mar', spend: 48000, conversions: 980, roi: 3.5 },
  { date: 'Apr', spend: 61000, conversions: 1340, roi: 4.1 },
  { date: 'May', spend: 58000, conversions: 1280, roi: 3.9 },
  { date: 'Jun', spend: 67000, conversions: 1520, roi: 4.3 },
];

export default function Dashboard() {
  const [consentRecords, setConsentRecords] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [platformSyncs, setPlatformSyncs] = useState([]);
  const [intelligenceSignals, setIntelligenceSignals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [consents, campaignData, platforms, signals] = await Promise.all([
        ConsentRecord.list('-created_date', 50),
        CampaignData.list('-created_date', 20),
        PlatformSync.list(),
        IntelligenceSignal.list('-created_date', 10)
      ]);
      
      setConsentRecords(consents);
      setCampaigns(campaignData);
      setPlatformSyncs(platforms);
      setIntelligenceSignals(signals);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setIsLoading(false);
  };

  const calculateMetrics = () => {
    const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget_allocated || 0), 0);
    const totalSpent = campaigns.reduce((sum, c) => sum + (c.budget_spent || 0), 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
    const avgROI = campaigns.length > 0 
      ? campaigns.reduce((sum, c) => sum + (c.roi || 0), 0) / campaigns.length 
      : 0;
    
    const consentCompliance = consentRecords.length > 0
      ? (consentRecords.filter(c => c.consent_status === 'granted').length / consentRecords.length) * 100
      : 0;

    return {
      totalBudget,
      totalSpent,
      totalConversions,
      avgROI,
      consentCompliance,
      budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-600">Real-time intelligence across your consent and campaign ecosystem</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Ad Spend"
          value={`$${metrics.totalSpent.toLocaleString()}`}
          change="+12.3%"
          trend="up"
          icon={DollarSign}
          color="blue"
        />
        <MetricCard
          title="Conversions"
          value={metrics.totalConversions.toLocaleString()}
          change="+8.7%"
          trend="up"
          icon={Target}
          color="green"
        />
        <MetricCard
          title="Average ROI"
          value={`${metrics.avgROI.toFixed(1)}x`}
          change="+15.2%"
          trend="up"
          icon={TrendingUp}
          color="purple"
        />
        <MetricCard
          title="Consent Compliance"
          value={`${metrics.consentCompliance.toFixed(1)}%`}
          change="+2.1%"
          trend="up"
          icon={Shield}
          color="emerald"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart data={mockPerformanceData} />
        </div>
        <div>
          <PlatformStatus platforms={platformSyncs} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ConsentOverview records={consentRecords} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <IntelligenceFeed signals={intelligenceSignals} />
          <RecentActivity 
            campaigns={campaigns.slice(0, 3)} 
            consents={consentRecords.slice(0, 3)} 
          />
        </div>
      </div>
    </div>
  );
}
