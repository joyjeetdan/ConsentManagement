import React, { useState, useEffect } from "react";
import { PlatformSync } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Puzzle, Plus, Search, ChevronsRightLeft, Zap } from "lucide-react";
import PlatformCard from "../components/integrations/PlatformCard";
import ConnectPlatformModal from "../components/integrations/ConnectPlatformModal";

export default function Integrations() {
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPlatforms();
  }, []);

  const loadPlatforms = async () => {
    setIsLoading(true);
    try {
      const data = await PlatformSync.list();
      setPlatforms(data);
    } catch (error) {
      console.error("Error loading platforms:", error);
    }
    setIsLoading(false);
  };
  
  const handleConnect = async (platformData) => {
    try {
      // In a real app, this would involve an OAuth flow.
      // Here, we just create a new record.
      const newPlatform = {
        platform_name: platformData.name,
        platform_type: platformData.type,
        connection_status: "connected",
        sync_direction: "two_way",
        last_sync_time: new Date().toISOString(),
        exclusion_lists_count: 0,
        records_synced: 0,
      };
      await PlatformSync.create(newPlatform);
      setShowModal(false);
      loadPlatforms();
    } catch (error)      {
      console.error("Error connecting platform:", error);
    }
  };

  const adPlatforms = platforms.filter(p => p.platform_type === 'ad_platform');
  const crmPlatforms = platforms.filter(p => p.platform_type === 'crm');

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Integrations Hub</h1>
          <p className="text-slate-600">Manage connections to your ad platforms and CRMs</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 gap-2"
        >
          <Plus className="w-4 h-4" />
          Connect New Platform
        </Button>
      </div>

      {/* CRM Platforms Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <ChevronsRightLeft className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-slate-800">CRM Platforms</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crmPlatforms.map(platform => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </section>

      {/* Ad Platforms Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-semibold text-slate-800">Ad Platforms</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adPlatforms.map(platform => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </section>
      
      {/* Modal */}
      {showModal && (
        <ConnectPlatformModal
          onClose={() => setShowModal(false)}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
}