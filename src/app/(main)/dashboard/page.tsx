import { AcademicCapIcon, CalendarDaysIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold text-text-DEFAULT mb-6">Dashboard Overview</h1>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-indigo-500 text-white p-8 rounded-2xl shadow-custom-medium text-center">
        <h2 className="text-4xl font-display font-extrabold mb-2">Welcome Back!</h2>
        <p className="text-xl font-light mb-6">Stay on top of your academic journey.</p>
        <button className="btn-secondary bg-white text-primary hover:bg-indigo-100">
          View My Progress
        </button>
      </section>

      {/* Feature Sections */}
      <section>
        <h2 className="text-2xl font-display font-semibold text-text-DEFAULT mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card flex items-center space-x-4">
            <AcademicCapIcon className="h-10 w-10 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-text-DEFAULT">My Courses</h3>
              <p className="text-text-light text-sm">Access all your enrolled courses.</p>
            </div>
          </div>
          <div className="card flex items-center space-x-4">
            <CalendarDaysIcon className="h-10 w-10 text-secondary" />
            <div>
              <h3 className="text-lg font-semibold text-text-DEFAULT">Upcoming Schedule</h3>
              <p className="text-text-light text-sm">Check your classes and deadlines.</p>
            </div>
          </div>
          <div className="card flex items-center space-x-4">
            <ChartBarIcon className="h-10 w-10 text-accent" />
            <div>
              <h3 className="text-lg font-semibold text-text-DEFAULT">Performance Analytics</h3>
              <p className="text-text-light text-sm">Track your grades and attendance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity/Announcements Card */}
      <section className="card">
        <h2 className="text-2xl font-display font-semibold text-text-DEFAULT mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="border-b border-border pb-3 last:border-b-0">
            <p className="text-text-DEFAULT font-medium">New assignment posted for <span className="text-primary">Calculus I</span></p>
            <p className="text-text-light text-sm">Due: July 15, 2025</p>
          </li>
          <li className="border-b border-border pb-3 last:border-b-0">
            <p className="text-text-DEFAULT font-medium">Your attendance for <span className="text-primary">Physics II</span> updated</p>
            <p className="text-text-light text-sm">Status: Present</p>
          </li>
          <li>
            <p className="text-text-DEFAULT font-medium">Reminder: <span className="text-primary">Chemistry Lab</span> tomorrow at 10 AM</p>
            <p className="text-text-light text-sm">Location: Lab Room 301</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardPage;
