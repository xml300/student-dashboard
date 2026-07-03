
import { getServerSession } from 'next-auth';
import { db } from '@/data/db';
import { authorizedDevices } from '@/data/db/schema';
import DevicesManagementClient from './DevicesManagementClient';
import { Device, NSession } from '@/types/data';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { eq } from 'drizzle-orm';

export default async function DevicesManagementPage() {
  const session: NSession | null = await getServerSession(authOptions);
  if(!session) return <p>Unauthorized</p>;

  const lecturerId = session.lecturerId;
  if (!lecturerId) {
    return <div className="p-8">No lecturer session found.</div>;
  }
  
  const dbDevices = await db.select().from(authorizedDevices).where(eq(authorizedDevices.userId, (session as any).id));
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
