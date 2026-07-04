import CourseClient from './CourseClient'; 
import { Coursex } from '@/types/data';
import { Courses } from '@/data/models/courses';
import { getCurrentUser } from '@/lib/auth';

export default async function CoursesPage() {
  const user = await getCurrentUser();
  if (!user){
    return (<p>Unauthorized</p>)
  }

  if(!user.lecturerId){
    return (<p>No Lecturer Assigned</p>)
  }
  
  const courseRows = await Courses.getByLecturerId(user.lecturerId);
  const availableCourses = await Courses.get();

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <CourseClient courses={courseRows as any as Coursex[]} availableCourses={availableCourses as any as Coursex[]} />
      </div>
  );

}
