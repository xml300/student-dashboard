
"use client";

import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceData } from "./LecturerReportContainer";

interface DataVisualizationsProps {
  attendanceData: AttendanceData[];
}

export default function DataVisualizations({ attendanceData }: DataVisualizationsProps) {
  const [trendData, setTrendData] = useState<{ name: string; attendance: number; total: number }[]>([]);
  const [statusData, setStatusData] = useState<{ name: string; value: number; fill: string }[]>([]);
  const [topAbsentees, setTopAbsentees] = useState<{name: string; absences: number}[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const byDate: Record<string, { name: string; attendance: number; total: number }> = {};
    (attendanceData as AttendanceData[]).forEach((r) => {
      const date = new Date(r.date).toLocaleDateString();
      if (!byDate[date]) byDate[date] = { name: date, attendance: 0, total: 0 };
      if (r.status === 'Present') byDate[date].attendance += 1;
      byDate[date].total += 1;
    });
    setTrendData(Object.values(byDate).map((d) => ({ ...d, attendance: d.total ? Math.round((d.attendance / d.total) * 100) : 0 })));

    
    const statusCounts: Record<string, number> = { Present: 0, 'Absent (Unexcused)': 0, 'Absent (Excused)': 0, Late: 0 };
    (attendanceData as AttendanceData[]).forEach((r) => { if (statusCounts[r.status] !== undefined) statusCounts[r.status] += 1; });
    setStatusData([
      { name: 'Present', value: statusCounts.Present, fill: '#22c55e' },
      { name: 'Absent (Unexcused)', value: statusCounts['Absent (Unexcused)'], fill: '#ef4444' },
      { name: 'Absent (Excused)', value: statusCounts['Absent (Excused)'], fill: '#eab308' },
      { name: 'Late', value: statusCounts.Late, fill: '#f97316' }
    ]);

    
    const absenteeMap: Record<string, { name: string; absences: number }> = {};
    (attendanceData as AttendanceData[]).forEach((r) => {
      if (r.status === "Absent (Unexcused)" || r.status === "Absent (Excused)") {
        const id = r.studentId;
        if (!absenteeMap[id]) absenteeMap[id] = { name: r.studentName, absences: 0 };
        absenteeMap[id].absences += 1;
      }
    });
    const sortedAbsentees = Object.values(absenteeMap).sort((a, b) => b.absences - a.absences).slice(0, 5);
    setTopAbsentees(sortedAbsentees);
    setLoading(false);
  }, [attendanceData]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Class Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-8">Loading...</div> : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-8">Loading...</div> : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {statusData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>)}
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Absentees</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-8">Loading...</div> : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topAbsentees} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="absences" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
  