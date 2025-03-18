// Dummy data for demonstration
interface Course {
    id: string;
    name: string;
    description: string;
    credits: number;
}

interface Device {
    id: string;
    name: string;
    location: string;
    status: 'online' | 'offline';
}

interface Room {
    id: string;
    name: string;
    capacity: number;
    type: 'classroom' | 'lab' | 'office';
}
