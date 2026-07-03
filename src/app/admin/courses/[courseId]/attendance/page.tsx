"use client";
import React, { useEffect, useState, Fragment } from "react";
import { EllipsisVerticalIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useParams } from "next/navigation";
import Link from "next/link";
import { CourseOverview, AttendanceRecord, Record } from "@/types/data";
import Pagination from '@/components/admin/Pagination';

const AttendancePage = () => {
  const params = useParams();
  const courseId = decodeURI(params?.courseId as string);
  const [course, setCourse] = useState<CourseOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const menuRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [modalOpen, setModalOpen] = useState<number | null>(null);
  const [modalStatus, setModalStatus] = useState<"Present" | "Absent" | "Excused">("Present");
  const [modalRemarks, setModalRemarks] = useState("");
  const [newSessionDisabled, setNewSessionDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    async function fetchAttendanceRecords() {
      try {
        const response = await fetch(`/api/attendance/${courseId}`);
        const records = await response.json();

        const now = Date.now();
        const recentSession = records.find((s: AttendanceRecord) => {
          const sessionTime = new Date(s.date).getTime();
          return now - sessionTime < 3 * 60 * 60 * 1000;
        });
        if (recentSession) {
          setAttendanceRecords([recentSession]);
          setNewSessionDisabled(true);
        } else {
          setNewSessionDisabled(false);
        }
      } catch (e) {
        console.error(e)
        setAttendanceRecords([]);
        setNewSessionDisabled(false);
      }
      setLoading(false);
    }
    fetchAttendanceRecords();
  }, [courseId]);

  useEffect(() => {
    setLoading(true);
    async function fetchCourse() {
      try {
        const courseRes = await fetch(`/api/courses/${courseId}`);
        const courseData = await courseRes.json();
        setCourse(courseData);
      } catch (e) {
        console.error(e)
        setCourse(null);
      }
      setLoading(false);
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    setLoading(true);
    async function fetchAttendanceRecords() {
      try {
        const response = await fetch(`/api/attendance/${courseId}`);
        const records = await response.json();

        const now = Date.now();
        const recentSession = records.find((s: AttendanceRecord) => {
          const sessionTime = new Date(s.date).getTime();
          return now - sessionTime < 3 * 60 * 60 * 1000;
        });
        if (recentSession) {
          setAttendanceRecords([recentSession]);
          setNewSessionDisabled(true);
        } else {
          setNewSessionDisabled(false);
        }
      } catch (e) {
        console.error(e)
        setAttendanceRecords([]);
        setNewSessionDisabled(false);
      }
      setLoading(false);
    }
    fetchAttendanceRecords();
  }, [courseId]);

  async function handleAttendanceEdit(recordId: number) {
    console.log(attendanceRecords, recordId)
    const sessionIndex = attendanceRecords.findIndex(s => s.id === recordId);
    if (sessionIndex !== -1) {
      fetch('/api/attendance/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recordId: attendanceRecords[sessionIndex].id,
          attendanceRecord: modalStatus === "Present" ? 1 : modalStatus === "Excused" ? null : 0,
          remarks: modalRemarks,
        }),
      });
    }
    setModalOpen(null);
    location.reload();
  }

  const paginatedRecords = attendanceRecords.length > 0 && attendanceRecords[0].records
    ? attendanceRecords[0].records.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
    : [];
  const totalPages = attendanceRecords.length > 0 && attendanceRecords[0].records
    ? Math.ceil(attendanceRecords[0].records.length / recordsPerPage)
    : 1;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-[#18181b] dark:via-[#232336] dark:to-[#1e293b] min-h-screen rounded-2xl shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-primary-accent dark:text-blue-400 tracking-tight drop-shadow">Attendance Records</h1>

      <div className="mb-6 flex justify-end">
        <button
          className="px-6 py-3 rounded-lg bg-primary-accent text-white font-semibold shadow hover:bg-primary-accent/90 transition"
          onClick={async () => {
            setLoading(true);
            try {
              const res = await fetch(`/api/lectureSessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId }),
              });
              if (!res.ok) throw new Error('Failed to create session');
              const newSession = await res.json();

              const response = await fetch(`/api/attendance/${courseId}`);
              const records = await response.json();

              const createdSession = records.find((s: AttendanceRecord) => s.id === newSession.sessionId || s.date === newSession.sessionDatetime);
              if (createdSession) {
                setAttendanceRecords([createdSession]);
                setNewSessionDisabled(true);
              } else {
                setAttendanceRecords([]);
                setNewSessionDisabled(false);
              }
            } catch (e) {
              if (e instanceof Error) {
                alert('Error creating session' + " " + e.message);
              }
              setAttendanceRecords([]);
              setNewSessionDisabled(false);
            }
            setLoading(false);
          }}
          disabled={newSessionDisabled}
        >
          Initiate Lecture Session
        </button>
      </div>
      {loading ? (
        <div className="text-foreground/60">Loading course info...</div>
      ) : course ? (
        <>
          <div className="mb-8 p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-border-color dark:border-zinc-700 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-2xl font-bold text-foreground dark:text-white mb-1">{course.name}</div>
              <div className="text-foreground/80 dark:text-zinc-300 text-base mb-1">Course ID: <span className="font-mono font-semibold">{course.title}</span></div>
              <div className="text-foreground/80 dark:text-zinc-300 text-base">Credits: {course.credits} | Semester: {course.semester === 1 ? '1st' : '2nd'}</div>
            </div>
            <div className="text-foreground/80 dark:text-zinc-400 text-base md:max-w-lg italic">{course.description}</div>
          </div>

          <div className="space-y-12">
            {attendanceRecords.length === 0 ? (
              <div className="text-center text-foreground/60 dark:text-zinc-400 text-lg py-12">No attendance records found for this course.</div>
            ) : (
              attendanceRecords.map((session) => (
                <div key={session.id} className="bg-white/90 dark:bg-zinc-900/80 rounded-2xl shadow-lg border border-border-color dark:border-zinc-700 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div className="text-xl font-bold text-primary-accent dark:text-blue-400">{session.session}</div>
                    <div className="text-foreground/80 dark:text-zinc-300 text-base">{new Date(session.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  </div>
                  <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full border-separate border-spacing-y-2">
                      <thead>
                        <tr className="bg-primary-accent/10 dark:bg-blue-900/30 text-primary-accent dark:text-blue-300 text-lg">
                          <th className="px-6 py-3 rounded-l-xl">S/N</th>
                          <th className="px-6 py-3">Matric No</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Time Marked</th>
                          <th className="px-6 py-3">Remarks</th>
                          <th className="rounded-r-xl"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRecords.map((rec: Record, idx: number) => (
                          <Fragment key={rec.studentId}>
                            <tr className="bg-white/90 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 transition border-b border-border-color dark:border-zinc-700 rounded-xl shadow-sm relative">
                              <td className="px-6 py-3 font-semibold text-center rounded-l-xl text-foreground dark:text-white">{(currentPage - 1) * recordsPerPage + idx + 1}</td>
                              <td className="px-6 py-3 font-mono text-base text-center text-foreground dark:text-blue-200">{rec.matricNo}</td>
                              <td className="px-6 py-3 text-center">
                                {rec.attendanceRecord == null ? (
                                  <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-semibold shadow">Excused</span>
                                ) : rec.attendanceRecord == 1 ? (
                                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold shadow">Present</span>
                                ) : (
                                  <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold shadow">Absent</span>
                                )}
                              </td>
                              <td className="px-6 py-3 text-center">
                                {rec.time ? (
                                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold shadow">{new Date(rec.time).toLocaleTimeString()}</span>
                                ) : (
                                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 rounded-full text-sm">-</span>
                                )}
                              </td>
                              <td className="px-6 py-3 text-center">
                                <span>{rec.remarks}</span>
                              </td>
                              <td className="px-6 py-3 text-center rounded-r-xl flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  className="ml-2 p-1 rounded hover:bg-foreground/10 dark:hover:bg-zinc-700"
                                  onClick={() => setMenuOpen(menuOpen === idx ? null : idx)}
                                  aria-label="Options"
                                >
                                  <EllipsisVerticalIcon className="h-5 w-5 text-foreground dark:text-zinc-300" />
                                </button>
                                {menuOpen === idx && (
                                  <div
                                    ref={(el) => { menuRefs.current[idx] = el; }}
                                    className="absolute z-10 right-4 top-12 min-w-[120px] bg-white dark:bg-zinc-900 border border-border-color dark:border-zinc-700 rounded-xl shadow-2xl animate-fade-in"
                                  >
                                    <button
                                      className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-primary-accent/10 dark:hover:bg-blue-900/30 text-foreground dark:text-zinc-200 font-medium transition-colors rounded-t-xl"
                                      onClick={() => {
                                        setModalStatus(rec.attendanceRecord == 1 ? "Present" : "Absent");
                                        setModalRemarks(rec.remarks || "");
                                        setModalOpen(idx);
                                        setMenuOpen(null);
                                      }}
                                    >
                                      <PencilSquareIcon className="h-5 w-5 text-primary-accent dark:text-blue-400" />
                                      Edit
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                            {modalOpen === idx && (
                              <tr>
                                <td colSpan={8} className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-50 bg-black/40 animate-fade-in">
                                  <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-xs mx-auto relative border border-border-color dark:border-zinc-700 animate-fade-in">
                                    <button
                                      className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-2xl text-foreground dark:text-zinc-300"
                                      onClick={() => setModalOpen(null)}
                                      aria-label="Close"
                                    >
                                      &times;
                                    </button>
                                    <div className="mb-6 flex items-center gap-2">
                                      <PencilSquareIcon className="h-7 w-7 text-primary-accent dark:text-blue-400" />
                                      <span className="text-xl font-bold text-foreground dark:text-white">Edit Status & Remarks</span>
                                    </div>
                                    <div className="mb-5">
                                      <label className="block mb-1 text-sm font-semibold text-foreground dark:text-zinc-200">Status</label>
                                      <div className="flex gap-3 mt-1">
                                        <button
                                          type="button"
                                          className={`flex-1 px-3 py-2 rounded-lg font-semibold border transition-colors ${modalStatus === 'Present' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-400' : 'bg-white dark:bg-zinc-900 border-border-color dark:border-zinc-700 text-foreground dark:text-white'}`}
                                          onClick={() => setModalStatus('Present')}
                                        >
                                          Present
                                        </button>
                                        <button
                                          type="button"
                                          className={`flex-1 px-3 py-2 rounded-lg font-semibold border transition-colors ${modalStatus === 'Absent' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-400' : 'bg-white dark:bg-zinc-900 border-border-color dark:border-zinc-700 text-foreground dark:text-white'}`}
                                          onClick={() => setModalStatus('Absent')}
                                        >
                                          Absent
                                        </button>
                                        <button
                                          type="button"
                                          className={`flex-1 px-3 py-2 rounded-lg font-semibold border transition-colors ${modalStatus === 'Excused' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-400' : 'bg-white dark:bg-zinc-900 border-border-color dark:border-zinc-700 text-foreground dark:text-white'}`}
                                          onClick={() => setModalStatus('Excused')}
                                        >
                                          Excused
                                        </button>
                                      </div>
                                    </div>
                                    <div className="mb-8">
                                      <label className="block mb-1 text-sm font-semibold text-foreground dark:text-zinc-200">Remarks</label>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 rounded-lg border border-border-color dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground dark:text-white focus:ring-2 focus:ring-primary-accent outline-none transition"
                                        value={modalRemarks}
                                        onChange={e => setModalRemarks(e.target.value)}
                                        placeholder="Add remarks..."
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <button
                                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 text-foreground dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
                                        onClick={() => setModalOpen(null)}
                                        type="button"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        className="px-4 py-2 rounded-lg bg-primary-accent text-white font-semibold hover:bg-primary-accent/90 transition"
                                        onClick={() => handleAttendanceEdit(session.id)}
                                        type="button"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="text-foreground/60">Course not found.</div>
      )}
      <div className="mt-16">
        <Link href={`/admin/courses/${courseId}`} className="text-primary-accent dark:text-blue-400 hover:underline text-lg font-semibold">Back to Course</Link>
      </div>
    </div>
  );
};

export default AttendancePage;
