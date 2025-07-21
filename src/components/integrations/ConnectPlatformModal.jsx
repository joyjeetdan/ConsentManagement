import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const availablePlatforms = [
  { name: 'meta', type: 'ad_platform', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png' },
  { name: 'google', type: 'ad_platform', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' },
  { name: 'linkedin', type: 'ad_platform', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { name: 'salesforce', type: 'crm', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
  { name: 'hubspot', type: 'crm', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/HubSpot_Logo.svg' },
  { name: 'zendesk', type: 'crm', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Zendesk_logo.svg' }
];

export default function ConnectPlatformModal({ onClose, onConnect }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Connect a New Platform</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {availablePlatforms.map(platform => (
            <div 
              key={platform.name}
              className="p-4 border rounded-lg flex flex-col items-center justify-center gap-4 hover:shadow-md hover:border-blue-500 transition-all cursor-pointer"
              onClick={() => onConnect(platform)}
            >
              <img src={platform.logo} alt={platform.name} className="h-12 w-12 object-contain" />
              <span className="font-medium capitalize">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}