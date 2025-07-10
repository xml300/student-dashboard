"use client";
import { useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

// Dummy data for attendance rooms
const attendanceRooms = [
  { id: 'room1', name: 'Web Development', status: 'open' },
  { id: 'room2', name: 'Data Structures', status: 'open' },
  // Add more rooms or fetch from API
];

export default function AttendancePage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-neutral-100 mb-4">Take Attendance</h1>
      {attendanceRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-neutral-950 border border-neutral-800 rounded-xl p-8">
          <ExclamationCircleIcon className="h-10 w-10 text-yellow-400 mb-2" />
          <p className="text-neutral-300 text-lg font-medium">No attendance rooms are currently open.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-neutral-400 mb-2">Select an attendance room to proceed:</p>
          <ul className="space-y-4">
            {attendanceRooms.map((room) => (
              <li key={room.id}>
                <button
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border transition-colors text-left ${selectedRoom === room.id ? 'bg-blue-600 border-blue-500 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-200 hover:bg-neutral-900'}`}
                >
                  <span className="font-semibold text-lg">{room.name}</span>
                  {selectedRoom === room.id && <CheckCircleIcon className="h-6 w-6 text-white" />}
                </button>
              </li>
            ))}
          </ul>
          {selectedRoom && (
            <div className="mt-6 flex flex-col items-center">
              <CheckCircleIcon className="h-10 w-10 text-green-500 mb-2" />
              <p className="text-green-400 font-semibold">You have selected: {attendanceRooms.find(r => r.id === selectedRoom)?.name}</p>
              {/* Add further attendance actions here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
