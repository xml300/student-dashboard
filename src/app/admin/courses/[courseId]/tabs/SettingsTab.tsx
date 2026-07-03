
import React, { useState } from 'react'; 
import { CourseDisplay } from '@/data/types/types';
import { useRouter } from 'next/navigation';

interface CourseSettings {
  allowLateAttendance: boolean;
  maxLateMinutes: number;
  requireDeviceCheck: boolean;
  customNote: string;
}

const defaultSettings: CourseSettings = {
  allowLateAttendance: true,
  maxLateMinutes: 10,
  requireDeviceCheck: false,
  customNote: '',
};

const SettingsTab = ({ course }: { course: CourseDisplay }) => {
  const [settings] = useState<CourseSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`/api/courses/${course.courseCode}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
            setError(err.message || 'Unknown error');
      }
    }
    setSaving(false);
  };

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    setDeleting(true);
    setDeleteError(null);
    setDeleteSuccess(false);
    try {
      const res = await fetch(`/api/courses/${course.courseCode}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete course');
      setDeleteSuccess(true);
      
      if (router) {
        setTimeout(() => {
          router.push('/courses');
        }, 1200);
      }
    } catch (err) {
      if(err instanceof Error){
      setDeleteError(err.message || 'Unknown error');
      }
    }
    setDeleting(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-card-background rounded-lg border border-border-color p-6">
          <h2 className="text-lg font-medium mb-4">Course Information</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label htmlFor="courseTitle" className="block text-sm font-medium text-foreground/80 mb-1">Course Title</label>
              <input type="text" id="courseTitle" defaultValue={course.courseName} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="courseCode" className="block text-sm font-medium text-foreground/80 mb-1">Course Code</label>
                <input type="text" id="courseCode" defaultValue={course.courseCode} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" />
              </div>
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-foreground/80 mb-1">Semester</label>
                <input type="number" min={1} max={2} id="semester" defaultValue={course.semester} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" />
              </div>
            </div>
            <div>
              <label htmlFor="courseDescription" className="block text-sm font-medium text-foreground/80 mb-1">Description</label>
              <textarea defaultValue={course.courseDesc} id="courseDescription" rows={4} className="w-full bg-background border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-accent" placeholder="Enter a brief description of the course..."></textarea>
            </div>
            <div className="flex gap-4 items-center mt-6">
              <button type="submit" className="bg-primary-accent hover:bg-primary-accent/90 text-white px-4 py-2 rounded-md" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {success && <span className="text-green-600">Settings saved!</span>}
              {error && <span className="text-red-600">{error}</span>}
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="bg-card-background rounded-lg border border-border-color p-6">
          <h2 className="text-lg font-medium mb-4">Danger Zone</h2>
          <p className="text-sm text-foreground/80 mb-4">These actions are irreversible. Please be certain before proceeding.</p>
          <div className="space-y-2">
            <button
              className="w-full bg-red-500/10 border border-red-500 text-red-500 rounded py-2 text-sm hover:bg-red-500/20"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Course'}
            </button>
            {deleteSuccess && <span className="text-green-600 block mt-2">Course deleted!</span>}
            {deleteError && <span className="text-red-600 block mt-2">{deleteError}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
