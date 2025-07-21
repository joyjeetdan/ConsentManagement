import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function ConsentFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (field, value) => {
    onFiltersChange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex gap-3 items-center">
      <Filter className="w-4 h-4 text-slate-400" />
      <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="granted">Granted</SelectItem>
          <SelectItem value="withdrawn">Withdrawn</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="email_marketing">Email Marketing</SelectItem>
          <SelectItem value="sms_marketing">SMS Marketing</SelectItem>
          <SelectItem value="personalized_ads">Personalized Ads</SelectItem>
          <SelectItem value="data_processing">Data Processing</SelectItem>
          <SelectItem value="cookies">Cookies</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.source} onValueChange={(value) => handleFilterChange('source', value)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="website">Website</SelectItem>
          <SelectItem value="mobile_app">Mobile App</SelectItem>
          <SelectItem value="crm">CRM</SelectItem>
          <SelectItem value="email_click">Email Click</SelectItem>
          <SelectItem value="customer_service">Customer Service</SelectItem>
          <SelectItem value="import">Import</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}