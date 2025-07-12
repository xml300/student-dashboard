import React from 'react';

import { Course } from '@/data/types/types';

const SettingsTab = ({ course }: {course: Course}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-card-background rounded-lg border border-border-color p-6">
          <h2 className="text-lg font-medium mb-4">Course Information</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="courseTitle" className="block text-sm font-medium text-foreground/80 mb-1">Course Title</label>
              <input type="text" id="courseTitle" defaultValue={course.title} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="courseCode" className="block text-sm font-medium text-foreground/80 mb-1">Course Code</label>
                <input type="text" id="courseCode" defaultValue={course.id} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" />
              </div>
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-foreground/80 mb-1">Semester</label>
                <input type="text" id="semester" defaultValue={course.semester} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" />
              </div>
            </div>
            <div>
              <label htmlFor="courseDescription" className="block text-sm font-medium text-foreground/80 mb-1">Description</label>
              <textarea id="courseDescription" rows={4} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" placeholder="Enter a brief description of the course..."></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-primary-accent hover:bg-primary-accent/90 text-white px-4 py-2 rounded-md">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="bg-card-background rounded-lg border border-border-color p-6">
          <h2 className="text-lg font-medium mb-4">Danger Zone</h2>
          <p className="text-sm text-foreground/80 mb-4">These actions are irreversible. Please be certain before proceeding.</p>
          <div className="space-y-2">
            <button className="w-full bg-red-500/10 border border-red-500 text-red-500 rounded py-2 text-sm hover:bg-red-500/20">
              Delete Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
