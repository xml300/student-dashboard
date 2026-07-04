"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

export interface FilterType{
  dateRange: string;
  student: string;
  statuses: string[];
}

interface FilterPanelProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterType>(filters || {});

  useEffect(() => {
    onChange(localFilters);
  }, [localFilters, onChange]);

  const handleDateRangeChange = (value: string) => {
    setLocalFilters((prev: FilterType) => ({ ...prev, dateRange: value }));
  };

  const handleStudentSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters((prev: FilterType) => ({ ...prev, student: e.target.value }));
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    setLocalFilters((prev: FilterType) => {
      const statuses = new Set(prev.statuses || []);
      if (checked) {
        statuses.add(status);
      } else {
        statuses.delete(status);
      }
      return { ...prev, statuses: Array.from(statuses) };
    });
  };

  const handleClear = () => {
    setLocalFilters({} as FilterType);
  };

  return (
    <div className="flex flex-col space-y-4 rounded-lg border bg-card p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div>
        <Label htmlFor="date-range">Date Range</Label>
        <Select
          value={localFilters.dateRange || "this-semester"}
          onValueChange={handleDateRangeChange}
        >
          <SelectTrigger id="date-range">
            <SelectValue placeholder="Select a range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-semester">This Semester</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="student-search">Search Student</Label>
        <Input
          id="student-search"
          placeholder="Search by name or ID"
          value={localFilters.student || ""}
          onChange={handleStudentSearch}
        />
      </div>

      <div>
        <Label>Attendance Status</Label>
        <div className="mt-2 space-y-2">
          {[
            { id: "present", label: "Present" },
            { id: "absent-unexcused", label: "Absent (Unexcused)" },
            { id: "absent-excused", label: "Absent (Excused)" },
          ].map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={localFilters.statuses?.includes(item.label) || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleStatusChange(item.label, e.target.checked)
                }
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
