'use client';

import { useEffect, useState } from 'react';
import {
  PlusCircleIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  StarIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import AddCourseModal from '@/components/AddCourseModal';
import { CourseOverview } from '@/types';

interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
  lastAttendance: string;
  nextSession: string;
  recentSessions: any[];
  students: number;
  attendanceRate: string;
  semester: string;
  title: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseOverview[]>([
    { id: 'CS101', name: 'Introduction to Programming', description: 'Learn the basics of programming with Python.', credits: 3, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Fall 2023', title: 'Introduction to Programming' },
    { id: 'CS201', name: 'Web Development Fundamentals', description: 'Build interactive websites using HTML, CSS, and JavaScript.', credits: 4, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Fall 2023', title: 'Web Development Fundamentals' },
    { id: 'CS205', name: 'Data Structures and Algorithms', description: 'Understand fundamental data structures and algorithms.', credits: 3, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Spring 2024', title: 'Data Structures and Algorithms' },
    { id: 'CS301', name: 'Database Management Systems', description: 'Explore relational databases and SQL.', credits: 3, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Spring 2024', title: 'Database Management Systems' },
    { id: 'CS305', name: 'Operating Systems', description: 'Learn about the core concepts of operating systems.', credits: 4, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Fall 2024', title: 'Operating Systems' },
  ]);
  const [filteredCourses, setFilteredCourses] = useState<CourseOverview[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  // Demo: Bookmarked state for each course (in real app, store in DB or user profile)
  const [bookmarked, setBookmarked] = useState<{ [id: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableCourses, setAvailableCourses] = useState<CourseOverview[]>([]);

  useEffect(() => {
    // Simulate fetching available courses from an API
    const fetchAvailableCourses = async () => {
      const dummyAvailableCourses: CourseOverview[] = [
        { id: 'CS401', name: 'Advanced Algorithms', description: 'In-depth study of advanced algorithms and complexity.', credits: 3, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Spring 2025', title: 'Advanced Algorithms' },
        { id: 'AI501', name: 'Machine Learning', description: 'Introduction to machine learning concepts and algorithms.', credits: 4, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Fall 2025', title: 'Machine Learning' },
        { id: 'SEC101', name: 'Cybersecurity Basics', description: 'Fundamental concepts of cybersecurity and network security.', credits: 3, lastAttendance: 'N/A', nextSession: 'N/A', recentSessions: [], students: 0, attendanceRate: '0%', semester: 'Spring 2025', title: 'Cybersecurity Basics' },
      ];
      setAvailableCourses(dummyAvailableCourses);
    };
    fetchAvailableCourses();
  }, []);


  useEffect(() => {
    let results = courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (showBookmarked) {
      results = results.filter((course) => bookmarked[course.id]);
    }
    setFilteredCourses(results);
  }, [searchTerm, courses, showBookmarked, bookmarked]);

  const handleAddCourse = (newCourse: CourseOverview) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleSelectCourse = (courseId: string) => {
    const courseToAdd = availableCourses.find(c => c.id === courseId);
    if (courseToAdd) {
      setCourses((prevCourses) => [...prevCourses, courseToAdd]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-2 w-full border border-border rounded-lg bg-card text-foreground placeholder:text-foreground/60 focus:ring-2 focus:ring-primary-accent focus:outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowBookmarked((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border transition-colors ${showBookmarked ? 'bg-primary-accent text-white' : 'bg-card text-foreground hover:bg-background'}`}
          >
            <StarIcon className={`h-5 w-5 ${showBookmarked ? 'text-yellow-300' : 'text-foreground/70'}`} />
            <span>Bookmarked</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-accent text-white border border-primary-accent hover:bg-primary-accent/90 transition-colors"
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => {
            // Example status logic (replace with real logic as needed)
            const status = course.nextSession !== 'N/A' ? 'Ongoing' : 'Upcoming';
            // Example progress (parse attendanceRate as percent)
            const progress = parseInt(course.attendanceRate) || 0;
            // Example instructor (placeholder)
            const instructor = { name: 'Dr. Jane Smith', avatar: null };
            // Example favorite state (from state)
            const isFavorite = bookmarked[course.id] || false;
            // Example recent activity (examples)
            let recentActivity = 'No recent activity';
            if (course.lastAttendance !== 'N/A') {
              const activities = [
                `Last attended: ${course.lastAttendance}`,
                `Assignment submitted on ${course.lastAttendance}`,
                `Quiz completed on ${course.lastAttendance}`,
                `Discussion posted on ${course.lastAttendance}`,
                `Feedback received on ${course.lastAttendance}`,
              ];
              recentActivity = activities[idx % activities.length];
            }
            return (
              <div
                key={course.id}
                className="relative bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border hover:-translate-y-1 group"
              >
                {/* Decorative accent bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-primary-accent group-hover:bg-primary-accent/80 transition-colors" />
                {/* Quick actions menu */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <button
                    className={`p-1 rounded-full ${isFavorite ? 'bg-yellow-400/10 text-yellow-400' : 'hover:bg-background text-foreground/70 hover:text-foreground'} transition-colors`}
                    title={isFavorite ? 'Remove bookmark' : 'Bookmark'}
                    onClick={() => setBookmarked((prev) => ({ ...prev, [course.id]: !isFavorite }))}
                  >
                    <StarIcon className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-1 rounded-full hover:bg-background text-foreground/70 hover:text-foreground transition-colors" title="More actions">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-background rounded-full flex items-center justify-center">
                      <BookOpenIcon className="h-8 w-8 text-foreground/70" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-1 line-clamp-1">{course.title}</h2>
                      <div className="flex gap-2 text-xs text-foreground/60 items-center">
                        <span className="font-medium">{course.semester}</span>
                        <span className="font-medium">• {course.students} students</span>
                        {/* Status badge */}
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold border ${status === 'Ongoing' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700' : 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700'}`}>{status}</span>
                      </div>
                    </div>
                  </div>
                  {/* Instructor info */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-xs text-foreground/70">
                      <UserCircleIcon className="h-5 w-5 text-foreground/60" />
                      {instructor.name}
                    </span>
                  </div>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3 flex-1">
                    {course.description || 'No description provided.'}
                  </p>
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-foreground/60">Attendance</span>
                      <span className="text-foreground/70 font-semibold">{course.attendanceRate}</span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-2 bg-green-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-foreground/60 mb-2">
                    <span className="font-medium">Code: <span className="font-semibold text-foreground/90">{course.id}</span></span>
                    <span className="font-medium">Units: <span className="font-semibold text-foreground/90">{course.credits}</span></span>
                  </div>
                  {/* Recent activity */}
                  <div className="text-xs text-foreground/60 mb-4 italic">{recentActivity}</div>
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/courses/${course.id}`} className="flex-1 px-3 py-2 rounded-lg bg-black dark:bg-primary-accent text-white border border-primary-accent hover:bg-primary-accent/90 text-sm text-center transition-colors font-medium">
                      View Details
                    </Link>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-border text-foreground border border-border hover:bg-border/70 text-sm transition-colors font-medium">
                      Take Attendance
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <BookOpenIcon className="mx-auto h-16 w-16 text-foreground/60" />
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            No Courses Found
          </h3>
          <p className="mt-2 text-sm text-foreground/60">
            Get started by adding a new course.
          </p>
        </div>
      )}

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courses={availableCourses}
        onSelectCourse={handleSelectCourse}
      />
    </div>
  );
}
