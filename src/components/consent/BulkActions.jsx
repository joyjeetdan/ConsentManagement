
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Trash2, Download, X } from "lucide-react";

export default function BulkActions({ selectedCount, onClearSelection }) {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600">
              {selectedCount} selected
            </Badge>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Sync to Platforms
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Selected
              </Button>
              <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </Button>
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={onClearSelection}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
