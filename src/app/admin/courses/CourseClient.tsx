"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/admin/ui/card';
import Link from 'next/link';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Coursex, CourseSubmit } from "@/types/data";
import AddCourseModal from "@/components/admin/modals/AddCourseModal";


export default function CourseClient({ courses, availableCourses }: { courses: Coursex[], availableCourses: Coursex[] }) {
    const [activeTab, setActiveTab] = useState('all');
    const [courses_, setCourses] = useState<Coursex[]>(courses);
    const [availableCourses_] = useState<Coursex[]>(availableCourses);
    const [modalOpen, setModalOpen] = useState(false);


    const handleAddCourse = async (course: CourseSubmit) => {
        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course),
            });

            const savedCourse: Coursex = await response.json();
            setCourses(prev => [...prev, savedCourse]);
            setModalOpen(false);
        } catch (error) {

            console.error(error);
        }
    };


    const handleSelectCourse = async (courseId: string) => {
        try {

            const response = await fetch('/api/courses/assign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId }),
            });
            if (!response.ok) throw new Error('Failed to assign course to lecturer');

        } catch (error) {
            console.error(error);
        }
    };

    const filteredCourses = courses_.filter((course: Coursex) =>
        activeTab === 'all' || course.status === activeTab
    );

    return (
        <>
            <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">Courses</h1>
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search devices..."
                            className="pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent w-full bg-card-background text-foreground"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60 h-5 w-5" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'all' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'active' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
                            Active
                        </button>
                        <button
                            onClick={() => setActiveTab('archived')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'archived' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
                            Archived
                        </button>
                    </div>

                    <div className="flex space-x-3 w-full sm:w-auto">
                        <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90" onClick={() => setModalOpen(true)}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add Course
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>{course.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-2 text-sm text-muted-foreground">{course.description}</div>
                                <div className="flex flex-wrap gap-2 text-xs text-foreground/70 mb-2">
                                    <span>Credits: {course.credits}</span>
                                    <span>Semester: {course.semester}</span>
                                    <span>Status: {course.status}</span>
                                </div>
                                <Link href={`/admin/courses/${course.id}`} className="inline-block mt-2 text-primary hover:underline text-sm font-medium">View Details</Link>
                            </CardContent>
                        </Card>
                    ))}

                    <Card className="border-2 border-dashed border-border-color flex flex-col items-center justify-center p-10 text-foreground/60 hover:border-primary-accent hover:text-primary-accent cursor-pointer transition-colors" onClick={() => setModalOpen(true)}>
                        <PlusIcon className="h-8 w-8 mb-2" />
                        <div className="font-medium">Add New Course</div>
                    </Card>
                </div>
            </div>

            <AddCourseModal
                isOpen={modalOpen}
                availableCourses={availableCourses_}
                onSelectCourse={handleSelectCourse}
                onClose={() => setModalOpen(false)}
                onAddCourse={handleAddCourse} />
        </>
    );
}