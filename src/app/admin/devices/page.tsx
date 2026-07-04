import { db } from '@/data/db';
import { authorizedDevices } from '@/data/db/schema';
import DevicesManagementClient from './DevicesManagementClient';
import { Device, NSession } from '@/types/data'; 
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export default async function DevicesManagementPage() {
  const user = await getCurrentUser();
  if(!user) return <p>Unauthorized</p>;

  if(!user.lecturerId){
    return <div className="p-8">No lecturer session found.</div>;
  }
  
  const dbDevices = await db.select().from(authorizedDevices).where(eq(authorizedDevices.userId, user.id));
  const devices: Device[] = dbDevices.map((dbDevice) => ({
    id: dbDevice.id,
    name: `Device ${dbDevice.id}`,
    type: dbDevice.deviceType ?? 'Unknown',
    model: 'Unknown Model',
    owner: 'Unknown Owner',
    status: (dbDevice.status as 'online' | 'offline' | 'maintenance') ?? 'offline',
    battery: 100,
    lastSync: dbDevice.updatedAt?.toISOString() ?? new Date().toISOString(),
    lastUsed: dbDevice.updatedAt?.toISOString() ?? new Date().toISOString(),
    wifiStrength: 'medium',
    assignedCourses: [],
    recentActivity: [],
    location: 'Unknown',
    lastSeen: dbDevice.updatedAt ?? new Date(),
  }));
  return <DevicesManagementClient initialDevices={devices} />;
}
