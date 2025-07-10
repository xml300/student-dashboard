'use client';

import { useEffect, useState } from 'react';
import { PlusCircleIcon, CalendarDaysIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface Schedule {
  id: number;
  courseId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [courseId, setCourseId] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch('/api/schedule');
      const data = await res.json();
      setSchedule(data);
    };
    fetchSchedule();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: parseInt(courseId),
        dayOfWeek: parseInt(dayOfWeek),
        startTime,
        endTime,
      }),
    });

    if (res.ok) {
      const newSchedule = await res.json();
      setSchedule([...schedule, newSchedule]);
      setCourseId('');
      setDayOfWeek('');
      setStartTime('');
      setEndTime('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-neutral-100">Weekly Schedule</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>Add Schedule</span>
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="grid grid-cols-7 gap-4 text-center mb-4">
          {days.map((day) => (
            <div key={day} className="font-bold text-neutral-200 text-lg">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, dayIndex) => {
            const items = schedule.filter((item) => item.dayOfWeek === dayIndex);
            return (
              <div key={dayIndex} className="min-h-[150px] border border-neutral-800 rounded-lg p-3 bg-neutral-950 flex flex-col gap-2 shadow">
                {items.length === 0 && <p className="text-neutral-500 text-sm">No classes</p>}
                {items.map((item) => (
                  <div key={item.id} className="bg-neutral-800 text-neutral-100 p-2 rounded-md text-xs border border-neutral-700">
                    <p className="font-semibold flex items-center gap-1">
                      <BookOpenIcon className="h-4 w-4 text-neutral-400" />
                      <span>Course ID: {item.courseId}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4 text-neutral-400" />
                      <span>
                        {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                        {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-950 bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-neutral-100 mb-6">Add New Schedule Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="courseId" className="block text-neutral-200 text-sm font-medium mb-2">
                  Course ID
                </label>
                <input
                  type="text"
                  id="courseId"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-neutral-700 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="dayOfWeek" className="block text-neutral-200 text-sm font-medium mb-2">
                  Day of Week (0-6, 0=Sunday)
                </label>
                <input
                  type="number"
                  id="dayOfWeek"
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-neutral-700 focus:outline-none text-sm"
                  min="0"
                  max="6"
                  required
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-neutral-200 text-sm font-medium mb-2">
                  Start Time
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-neutral-700 focus:outline-none text-sm pr-10"
                    required
                  />
                  <ClockIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                </div>
              </div>
              <div>
                <label htmlFor="endTime" className="block text-neutral-200 text-sm font-medium mb-2">
                  End Time
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-neutral-700 focus:outline-none text-sm pr-10"
                    required
                  />
                  <ClockIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-900 font-semibold border border-neutral-700 hover:bg-neutral-200 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
