"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { useEffect } from "react";
import { AttendanceData } from "./LecturerReportContainer";

interface StudentSummary {
  id: string;
  name: string;
  attendance: string;
  absences: number;
  lates: number;
}

export default function StudentInsights({ attendanceData }: { attendanceData: AttendanceData[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [studentData, setStudentData] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const summary: Record<string, StudentSummary & { total: number; present: number }> = {};
    (attendanceData as AttendanceData[]).forEach((r) => {
      const id = r.studentId;
      if (!summary[id]) {
        summary[id] = {
          id: ""+id,
          name: r.studentName,
          attendance: "0%",
          absences: 0,
          lates: 0,
          total: 0,
          present: 0,
        };
      }
      summary[id].total += 1;
      if (r.status === "Present") summary[id].present += 1;
      if (r.status === "Late") summary[id].lates += 1;
      if (r.status === "Absent (Unexcused)" || r.status === "Absent (Excused)") summary[id].absences += 1;
    });
    
    Object.values(summary).forEach((student) => {
      student.attendance = student.total > 0 ? `${Math.round((student.present / student.total) * 100)}%` : "0%";
    });
    setStudentData(Object.values(summary));
    setLoading(false);
  }, [attendanceData]);


  const filteredAndSortedStudents = studentData
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "attendance") {
        return (
          parseInt(b.attendance.replace("%", "")) -
          parseInt(a.attendance.replace("%", ""))
        );
      } else if (sortBy === "absences") {
        return b.absences - a.absences;
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="attendance">Attendance</SelectItem>
            <SelectItem value="absences">Absences</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg border">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Absences</TableHead>
                <TableHead>Lates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        parseInt(student.attendance.replace("%", "")) > 90
                          ? "success"
                          : "warning"
                      }
                    >
                      {student.attendance}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.absences}</TableCell>
                  <TableCell>{student.lates}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
