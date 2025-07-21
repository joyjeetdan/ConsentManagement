import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Shield } from "lucide-react";

export default function ConsentForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    user_identifier: "",
    consent_type: "",
    consent_status: "",
    source_platform: "",
    compliance_notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          Add Consent Record
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user_identifier">User Identifier</Label>
              <Input
                id="user_identifier"
                placeholder="email@example.com or phone number"
                value={formData.user_identifier}
                onChange={(e) => handleChange('user_identifier', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consent_type">Consent Type</Label>
              <Select value={formData.consent_type} onValueChange={(value) => handleChange('consent_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select consent type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email_marketing">Email Marketing</SelectItem>
                  <SelectItem value="sms_marketing">SMS Marketing</SelectItem>
                  <SelectItem value="personalized_ads">Personalized Ads</SelectItem>
                  <SelectItem value="data_processing">Data Processing</SelectItem>
                  <SelectItem value="cookies">Cookies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="consent_status">Consent Status</Label>
              <Select value={formData.consent_status} onValueChange={(value) => handleChange('consent_status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="granted">Granted</SelectItem>
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="source_platform">Source Platform</Label>
              <Select value={formData.source_platform} onValueChange={(value) => handleChange('source_platform', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile_app">Mobile App</SelectItem>
                  <SelectItem value="crm">CRM</SelectItem>
                  <SelectItem value="email_click">Email Click</SelectItem>
                  <SelectItem value="customer_service">Customer Service</SelectItem>
                  <SelectItem value="import">Data Import</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="compliance_notes">Compliance Notes</Label>
            <Textarea
              id="compliance_notes"
              placeholder="Additional compliance information..."
              value={formData.compliance_notes}
              onChange={(e) => handleChange('compliance_notes', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Consent Record
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}