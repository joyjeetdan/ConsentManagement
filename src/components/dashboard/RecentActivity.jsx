import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  TrendingUp, 
  Shield, 
  Clock,
  Target,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

export default function RecentActivity({ campaigns, consents }) {
  const activities = [
    ...campaigns.map(campaign => ({
      type: 'campaign',
      title: `Campaign optimized: ${campaign.campaign_name}`,
      description: `ROI improved to ${campaign.roi?.toFixed(1)}x`,
      timestamp: campaign.created_date,
      status: campaign.campaign_status,
      icon: TrendingUp,
      color: 'blue'
    })),
    ...consents.slice(0, 3).map(consent => ({
      type: 'consent',
      title: `Consent ${consent.consent_status}: ${consent.consent_type}`,
      description: `From ${consent.source_platform}`,
      timestamp: consent.created_date,
      status: consent.consent_status,
      icon: Shield,
      color: consent.consent_status === 'granted' ? 'green' : 'red'
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 8);

  const getStatusColor = (status, type) => {
    if (type === 'campaign') {
      return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800';
    }
    return status === 'granted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5 text-indigo-500" />
          Recent Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.color === 'blue' ? 'bg-blue-100' :
                  activity.color === 'green' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <IconComponent className={`w-4 h-4 ${
                    activity.color === 'blue' ? 'text-blue-600' :
                    activity.color === 'green' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.description}</p>
                    </div>
                    <Badge className={getStatusColor(activity.status, activity.type)}>
                      {activity.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {format(new Date(activity.timestamp), 'MMM d, HH:mm')}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}