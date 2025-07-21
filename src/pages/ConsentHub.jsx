
import React, { useState, useEffect } from "react";
import { ConsentRecord } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Search, 
  Filter, 
  Plus,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import ConsentForm from "../components/consent/ConsentForm";
import ConsentFilters from "../components/consent/ConsentFilters";
import BulkActions from "../components/consent/BulkActions";

const statusIcons = {
  granted: CheckCircle,
  withdrawn: XCircle,
  pending: Clock
};

const statusColors = {
  granted: "bg-green-100 text-green-800 border-green-200",
  withdrawn: "bg-red-100 text-red-800 border-red-200", 
  pending: "bg-amber-100 text-amber-800 border-amber-200"
};

export default function ConsentHub() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    source: "all"
  });

  useEffect(() => {
    loadConsentRecords();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [records, searchTerm, filters]);

  const loadConsentRecords = async () => {
    setIsLoading(true);
    try {
      const data = await ConsentRecord.list('-created_date');
      setRecords(data);
    } catch (error) {
      console.error('Error loading consent records:', error);
    }
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = records;

    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.user_identifier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.consent_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(record => record.consent_status === filters.status);
    }

    if (filters.type !== "all") {
      filtered = filtered.filter(record => record.consent_type === filters.type);
    }

    if (filters.source !== "all") {
      filtered = filtered.filter(record => record.source_platform === filters.source);
    }

    setFilteredRecords(filtered);
  };

  const handleSubmit = async (consentData) => {
    try {
      await ConsentRecord.create({
        ...consentData,
        sync_status: {
          meta: false,
          google: false,
          linkedin: false
        }
      });
      setShowForm(false);
      loadConsentRecords();
    } catch (error) {
      console.error('Error creating consent record:', error);
    }
  };

  const toggleRecordSelection = (recordId) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const selectAllRecords = () => {
    setSelectedRecords(
      selectedRecords.length === filteredRecords.length 
        ? [] 
        : filteredRecords.map(r => r.id)
    );
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Consent Intelligence Hub</h1>
            <p className="text-slate-600">Centralized consent management and compliance monitoring</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Consent
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by user identifier or consent type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <ConsentFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedRecords.length > 0 && (
        <BulkActions 
          selectedCount={selectedRecords.length}
          onClearSelection={() => setSelectedRecords([])}
        />
      )}

      {/* Consent Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ConsentForm 
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Data Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Consent Records ({filteredRecords.length})
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={selectAllRecords}
              className="text-xs"
            >
              {selectedRecords.length === filteredRecords.length ? 'Deselect All' : 'Select All'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                      onChange={selectAllRecords}
                      className="rounded"
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Consent Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Sync Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const StatusIcon = statusIcons[record.consent_status];
                  return (
                    <TableRow 
                      key={record.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRecords.includes(record.id)}
                          onChange={() => toggleRecordSelection(record.id)}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {record.user_identifier}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {record.consent_type?.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[record.consent_status]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {record.consent_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {record.source_platform?.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {record.sync_status?.meta && <Badge className="bg-blue-100 text-blue-800 text-xs">Meta</Badge>}
                          {record.sync_status?.google && <Badge className="bg-green-100 text-green-800 text-xs">Google</Badge>}
                          {record.sync_status?.linkedin && <Badge className="bg-indigo-100 text-indigo-800 text-xs">LinkedIn</Badge>}
                          {!Object.values(record.sync_status || {}).some(Boolean) && (
                            <Badge variant="outline" className="text-xs">Pending</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(record.created_date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
