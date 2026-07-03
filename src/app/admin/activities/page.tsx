import { db } from '@/data/db';
import { activities } from '@/data/db/schema';
import LecturerAdminActivitiesClient from './LecturerAdminActivitiesClient';
import { Activity } from '@/types/data';

type ExtenActivity = Omit<Activity, 'timestamp'> & {
  timestamp: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export default async function LecturerAdminActivitiesPage() {
  const activityRows = await db.select().from(activities);
  
  const formattedActivities = activityRows.map(activity => ({
    ...activity,
    id: activity.id,
    timestamp: activity.timestamp ? new Date(activity.timestamp) : null,
    user: '',
    userName: '',
  })) as ExtenActivity[];
  return <LecturerAdminActivitiesClient initialActivities={formattedActivities} />;
}
