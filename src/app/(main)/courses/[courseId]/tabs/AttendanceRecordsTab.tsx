import React from 'react';
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent';
}

interface AttendanceRecordsTabProps {
  attendanceRecords: AttendanceRecord[];
}

const AttendanceRecordsTab: React.FC<AttendanceRecordsTabProps> = ({ attendanceRecords }) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Your Attendance Records</h3>
        <ul className="divide-y divide-border">
          {attendanceRecords.map((record, index) => (
            <li key={index} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-6 w-6 text-foreground/70" />
                <div>
                  <p className="text-lg font-medium text-foreground">{record.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                record.status === 'Present' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}>
                {record.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendanceRecordsTab;
