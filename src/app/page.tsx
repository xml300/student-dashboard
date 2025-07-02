import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboard, faBuilding } from "@fortawesome/free-regular-svg-icons";


export default function HomePage() {
  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border-l-4 border-primary dark:border-blue-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Students</p>
                <h3 className="text-2xl font-bold">248</h3>
                <p className="text-xs text-green-500 mt-1">
                  +12% from last semester
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <FontAwesomeIcon size="lg" icon={faUser} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border-l-4 border-secondary dark:border-yellow-400">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Attendance</p>
                <h3 className="text-2xl font-bold">82%</h3>
                <p className="text-xs text-red-500 mt-1">-3% from last month</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <FontAwesomeIcon size="lg" icon={faClipboard} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Rooms</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-green-500 mt-1">+2 from last week</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <FontAwesomeIcon size="lg" icon={faBuilding} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Connected Devices</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-purple-500 mt-1">
                  All devices online
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Attendance Trend</h3>
              <div className="flex items-center">
                <button className="text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1">
                  Weekly
                </button>
                <button className="text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1 ml-3">
                  Monthly
                </button>
                <button className="text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1 ml-3">
                  Semester
                </button>
              </div>
            </div>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Attendance chart visualization</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Room Utilization</h3>
              <div className="flex items-center">
                <button className="text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1">
                  By Floor
                </button>
                <button className="text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1 ml-3">
                  By Department
                </button>
              </div>
            </div>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">
                Room utilization chart visualization
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
            <div className="p-4 border-b border-custom">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
            </div>
            <div className="p-4">
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">
                        Attendance recorded for CS101
                      </p>
                      <p className="text-sm text-gray-500">
                        42 students present • 10:15 AM
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">New device registered</p>
                      <p className="text-sm text-gray-500">
                        Device ID: TAB-247 • 9:30 AM
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Low attendance alert</p>
                      <p className="text-sm text-gray-500">
                        MATH202 - 65% attendance • Yesterday
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Attendance report generated</p>
                      <p className="text-sm text-gray-500">
                        Mid-semester report • Yesterday
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="/activities"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  View all activities
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
            <div className="p-4 border-b border-custom">
              <h3 className="text-lg font-semibold">Upcoming Classes</h3>
            </div>
            <div className="p-4">
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 h-12 w-12 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="font-semibold">CS</span>
                      </div>
                      <div>
                        <p className="font-medium">Computer Science 202</p>
                        <p className="text-sm text-gray-500">
                          Room 301 • 10:00 AM - 11:30 AM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Ready
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 h-12 w-12 bg-secondary rounded-lg flex items-center justify-center text-white">
                        <span className="font-semibold">DB</span>
                      </div>
                      <div>
                        <p className="font-medium">Database Systems</p>
                        <p className="text-sm text-gray-500">
                          Room 205 • 1:00 PM - 2:30 PM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Device Check
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                        <span className="font-semibold">AI</span>
                      </div>
                      <div>
                        <p className="font-medium">Artificial Intelligence</p>
                        <p className="text-sm text-gray-500">
                          Room 408 • 3:00 PM - 4:30 PM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Ready
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                        <span className="font-semibold">SE</span>
                      </div>
                      <div>
                        <p className="font-medium">Software Engineering</p>
                        <p className="text-sm text-gray-500">
                          Room 102 • Tomorrow, 9:00 AM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="/schedule"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  View full schedule
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
