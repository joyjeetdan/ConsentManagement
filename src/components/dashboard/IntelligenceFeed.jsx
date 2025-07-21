import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Briefcase, UserX, AlertTriangle, ArrowRight, TrendingDown } from "lucide-react";
import { format } from "date-fns";

const signalConfig = {
  competitor_acquisition: { icon: Briefcase, color: "blue" },
  negative_sentiment: { icon: TrendingDown, color: "amber" },
  buying_intent: { icon: ArrowRight, color: "green" },
  churn_risk: { icon: AlertTriangle, color: "red" },
  new_decision_maker: { icon: UserX, color: "purple" },
};

export default function IntelligenceFeed({ signals }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Intelligence Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-64 overflow-y-auto">
        {signals.length > 0 ? (
          signals.map((signal) => {
            const config = signalConfig[signal.signal_type] || { icon: Lightbulb, color: "gray" };
            const Icon = config.icon;

            return (
              <div key={signal.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                <div className={`p-2 rounded-lg bg-${config.color}-100`}>
                  <Icon className={`w-5 h-5 text-${config.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-slate-800 text-sm">
                      {signal.identifier}
                    </p>
                    <span className="text-xs text-slate-400">
                      {format(new Date(signal.created_date), "MMM d")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{signal.details}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize text-xs">
                      {signal.signal_type.replace(/_/g, " ")}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Action: {signal.action_taken.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No intelligence signals yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}