import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export interface AttendanceTrendPoint {
  date: string;
  rate: number;
}

interface DashboardAttendanceTrendProps {
  data: AttendanceTrendPoint[];
}

const CustomTooltip = ({ active, payload, label }: {active?: boolean, payload?: {value: number}[], label?: string}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-border-color dark:border-zinc-700 rounded-lg p-3 shadow text-xs">
        <div className="font-semibold mb-1">{label}</div>
        <div>Attendance Rate: <span className="font-bold">{payload[0].value}%</span></div>
      </div>
    );
  }
  return null;
};

const DashboardAttendanceTrend: React.FC<DashboardAttendanceTrendProps> = ({ data }) => {
  
  const isDark = typeof window !== 'undefined' && document.documentElement.getAttribute("data-theme") == 'dark';

  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#fff" : "#222"} />
          <XAxis dataKey="date" tick={{ fontSize: 14, fill: isDark ? '#fff' : '#222', fontWeight: 700 }} axisLine={{ stroke: isDark ? '#fff' : '#222' }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 14, fill: isDark ? '#fff' : '#222', fontWeight: 700 }} axisLine={{ stroke: isDark ? '#fff' : '#222' }} />
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ color: isDark ? '#fff' : '#222', background: isDark ? '#222' : '#fff', border: `2px solid ${isDark ? '#fff' : '#222'}` }} />
          <ReferenceLine y={75} stroke="#22c55e" strokeDasharray="3 3" label={{ value: "Target", position: "right", fill: isDark ? '#22c55e' : '#16a34a', fontSize: 14, fontWeight: 700 }} />
          <Line type="monotone" dataKey="rate" stroke={isDark ? "#60a5fa" : "#3b82f6"} strokeWidth={3} dot={{ r: 4, stroke: isDark ? '#fff' : '#3b82f6', strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardAttendanceTrend;
