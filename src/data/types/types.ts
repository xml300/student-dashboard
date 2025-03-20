// Dummy data for demonstration
export interface Course {
    id: string;
    name: string;
    description: string;
    credits: number;
}

export interface Device {
    id: string;
    name: string;
    location: string;
    type: string;
    lastSeen: Date;
    status: string;
}

export interface Room {
    id: string;
    name: string;
    capacity: number;
    availability: string;
    features: string[];
    building: string;
    type: string;
}
