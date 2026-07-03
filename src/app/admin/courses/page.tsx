import CourseClient from './CourseClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Coursex, NSession } from '@/types/data';
import { Courses } from '@/data/models/courses';

export default async function CoursesPage() {
  const session: NSession | null = await getServerSession(authOptions);
  if (!session){
    return (<p>Unauthorized</p>)
  }
  
  const courseRows = await Courses.getByLecturerId(session.lecturerId);
  const availableCourses = await Courses.get();

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <CourseClient courses={courseRows as any as Coursex[]} availableCourses={availableCourses as any as Coursex[]} />
      </div>
  );

}
