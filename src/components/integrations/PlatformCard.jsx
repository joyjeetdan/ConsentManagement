import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Settings, RefreshCw, ChevronsRightLeft, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const platformLogos = {
  meta: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png',
  google: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
  linkedin: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  salesforce: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
  hubspot: 'https://upload.wikimedia.org/wikipedia/commons/9/91/HubSpot_Logo.svg',
  zendesk: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Zendesk_logo.svg'
};

const statusConfig = {
  connected: { icon: CheckCircle, color: "text-emerald-500", badge: "bg-emerald-100 text-emerald-800" },
  disconnected: { icon: AlertTriangle, color: "text-amber-500", badge: "bg-amber-100 text-amber-800" },
  error: { icon: AlertTriangle, color: "text-red-500", badge: "bg-red-100 text-red-800" },
  syncing: { icon: RefreshCw, color: "text-blue-500", badge: "bg-blue-100 text-blue-800" },
};

export default function PlatformCard({ platform }) {
  const config = statusConfig[platform.connection_status];
  const StatusIcon = config.icon;

  return (
    <Card className="flex flex-col border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <img src={platformLogos[platform.platform_name]} alt={platform.platform_name} className="w-10 h-10 object-contain"/>
          <CardTitle className="capitalize text-lg">{platform.platform_name}</CardTitle>
        </div>
        <Badge className={config.badge}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {platform.connection_status}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="text-sm text-slate-600 flex items-center justify-between">
          <span>Last Synced</span>
          <span className="font-medium text-slate-800">
            {platform.last_sync_time ? `${formatDistanceToNow(new Date(platform.last_sync_time))} ago` : 'Never'}
          </span>
        </div>
        <div className="text-sm text-slate-600 flex items-center justify-between">
          <span>Sync Direction</span>
          <Badge variant="outline" className="capitalize">
            {platform.sync_direction?.replace('_', ' ')}
          </Badge>
        </div>
        <div className="text-sm text-slate-600 flex items-center justify-between">
          <span>Records Synced</span>
          <span className="font-medium text-slate-800">{platform.records_synced || 0}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full gap-2">
          <Settings className="w-4 h-4" />
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
}