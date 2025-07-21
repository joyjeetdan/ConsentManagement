
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  RefreshCw, // Changed from Sync to RefreshCw
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  Zap
} from "lucide-react";

const platformIcons = {
  meta: "🔵",
  google: "🟡", 
  linkedin: "🔷",
  twitter: "🐦",
  tiktok: "⚫"
};

const statusConfig = {
  connected: { 
    icon: CheckCircle, 
    color: "text-emerald-500", 
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800"
  },
  syncing: { 
    icon: RefreshCw, // Changed from Sync to RefreshCw
    color: "text-blue-500", 
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-800"
  },
  error: { 
    icon: XCircle, 
    color: "text-red-500", 
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-800"
  },
  disconnected: { 
    icon: AlertTriangle, 
    color: "text-amber-500", 
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-800"
  }
};

export default function PlatformStatus({ platforms }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="w-5 h-5 text-purple-500" />
          Platform Sync Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.length > 0 ? (
          platforms.map((platform) => {
            const config = statusConfig[platform.connection_status];
            const StatusIcon = config.icon;
            
            return (
              <div key={platform.id} className={`p-4 rounded-xl ${config.bg} transition-all duration-200`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{platformIcons[platform.platform_name]}</span>
                    <div>
                      <h4 className="font-semibold text-slate-900 capitalize">
                        {platform.platform_name}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {platform.records_synced || 0} records synced
                      </p>
                    </div>
                  </div>
                  <Badge className={config.badge}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {platform.connection_status}
                  </Badge>
                </div>
                
                {platform.connection_status === 'syncing' && (
                  <Progress value={75} className="h-2" />
                )}
                
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>Last sync: {platform.last_sync_time ? new Date(platform.last_sync_time).toLocaleTimeString() : 'Never'}</span>
                  <span>{platform.exclusion_lists_count || 0} lists</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-500">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 opacity-50" /> {/* Changed from Sync to RefreshCw */}
            <p>No platforms connected yet</p>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-slate-900">
                {platforms.filter(p => p.connection_status === 'connected').length}
              </div>
              <div className="text-xs text-slate-500">Active</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">
                {platforms.reduce((sum, p) => sum + (p.records_synced || 0), 0)}
              </div>
              <div className="text-xs text-slate-500">Total Synced</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
