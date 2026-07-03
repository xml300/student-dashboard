import CourseClient from './CourseClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getAllCoursesData } from '@/lib/data/reports';
import { NSession } from '@/data/types/types';

export default async function CoursesPage() {
  const session: NSession | null = await getServerSession(authOptions);
  if (!session){
    return (<p>Unauthorized</p>)
  }
  
  const courseRows = await getAllCoursesData({ lecturerId: session.lecturerId }) || [];
  const availableCourses = await getAllCoursesData();

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <CourseClient courses={courseRows} availableCourses={availableCourses} />
      </div>
  );

}
