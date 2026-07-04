"use client";
import DashboardAttendanceTrend, { AttendanceTrendPoint } from "@/components/admin/DashboardAttendanceTrend";
import { api } from "@/lib/api";
import React, { useEffect, useState } from "react";

const DashboardAttendanceTrendLoader: React.FC = () => {
    const [trendData, setTrendData] = useState<AttendanceTrendPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState<'weekly' | 'monthly' | 'semester'>('weekly');

    useEffect(() => {
        async function fetchTrend() {
            setLoading(true);
            try {
                const data = await api.get<AttendanceTrendPoint[]>(`/admin/dashboard/attendance-trend?range=${range}`);
                setTrendData(data);
            } catch (e) {
                console.error(e);
                setTrendData([]);
            }
            setLoading(false);
        }
        fetchTrend();
    }, [range]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h3 className="text-lg font-semibold mb-2 sm:mb-0">
                    Attendance Trend
                </h3>
                <div className="flex items-center space-x-2 mb-2 justify-end">
                    <button
                        className={`text-xs sm:text-sm px-2 py-1 rounded ${range === 'weekly' ? 'bg-primary-accent text-white' : 'bg-primary-accent/20 text-primary-accent'}`}
                        onClick={() => setRange('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className={`text-xs sm:text-sm px-2 py-1 rounded ${range === 'monthly' ? 'bg-primary-accent text-white' : 'bg-primary-accent/20 text-primary-accent'}`}
                        onClick={() => setRange('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`text-xs sm:text-sm px-2 py-1 rounded ${range === 'semester' ? 'bg-primary-accent text-white' : 'bg-primary-accent/20 text-primary-accent'}`}
                        onClick={() => setRange('semester')}
                    >
                        Semester
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="text-foreground/60">Loading attendance trend...</div>
            ) : (
                <DashboardAttendanceTrend data={trendData} />
            )}
        </div>
    );
};

export default DashboardAttendanceTrendLoader;
