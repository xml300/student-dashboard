import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface Student {
  id: number;
  name: string;
}

interface StudentsTabProps {
  students: Student[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({ students }) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Enrolled Students ({students.length})</h3>
        <ul className="divide-y divide-border">
          {students.map((student) => (
            <li key={student.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCircleIcon className="h-8 w-8 text-foreground/70" />
                <div>
                  <p className="text-lg font-medium text-foreground">{student.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsTab;
