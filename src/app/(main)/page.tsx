import {
  UserIcon,
  ClipboardDocumentIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Card from "@/components/Card";


export default function HomePage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <Card className="border-l-4 border-primary-accent">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-foreground/80 mb-1">Total Students</p>
                <h3 className="text-2xl font-bold">248</h3>
                <p className="text-xs text-green-500 mt-1">
                  +12% from last semester
                </p>
              </div>
              <div className="p-2 bg-primary-accent/10 rounded-lg">
                <UserIcon className="h-6 w-6 text-primary-accent" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-secondary-accent">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-foreground/80 mb-1">Average Attendance</p>
                <h3 className="text-2xl font-bold">82%</h3>
                <p className="text-xs text-red-500 mt-1">-3% from last month</p>
              </div>
              <div className="p-2 bg-secondary-accent/10 rounded-lg">
                <ClipboardDocumentIcon className="h-6 w-6 text-secondary-accent" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-accent">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-foreground/80 mb-1">Connected Devices</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-accent mt-1">
                  All devices online
                </p>
              </div>
              <div className="p-2 bg-accent/10 rounded-lg">
                <DevicePhoneMobileIcon className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 sm:mb-0">
                Attendance Trend
              </h3>
              <div className="flex items-center space-x-2">
                <button className="text-xs sm:text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1 rounded">
                  Weekly
                </button>
                <button className="text-xs sm:text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1 rounded">
                  Monthly
                </button>
                <button className="text-xs sm:text-sm text-primary-accent hover:underline border-0 bg-primary-accent/20 px-2 py-1 rounded">
                  Semester
                </button>
              </div>
            </div>
            <div className="h-64 bg-background rounded flex items-center justify-center">
              <p className="text-foreground/60">Attendance chart visualization</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
              <Link
                href="/activities"
                className="text-primary-accent hover:underline text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <ul className="divide-y divide-border-color">
              <li className="py-3 flex items-start">
                <div className="bg-green-500/10 p-2 rounded-full mr-4">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Attendance recorded for CS101</p>
                  <p className="text-sm text-foreground/80">
                    42 students present • 10:15 AM
                  </p>
                </div>
              </li>
              <li className="py-3 flex items-start">
                <div className="bg-primary-accent/10 p-2 rounded-full mr-4">
                  <PlusIcon className="h-5 w-5 text-primary-accent" />
                </div>
                <div>
                  <p className="font-medium">New device registered</p>
                  <p className="text-sm text-foreground/80">
                    Device ID: TAB-247 • 9:30 AM
                  </p>
                </div>
              </li>
              <li className="py-3 flex items-start">
                <div className="bg-secondary-accent/10 p-2 rounded-full mr-4">
                  <ExclamationTriangleIcon className="h-5 w-5 text-secondary-accent" />
                </div>
                <div>
                  <p className="font-medium">Low attendance alert</p>
                  <p className="text-sm text-foreground/80">
                    MATH202 - 65% attendance • Yesterday
                  </p>
                </div>
              </li>
              <li className="py-3 flex items-start">
                <div className="bg-accent/10 p-2 rounded-full mr-4">
                  <EyeIcon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Attendance report generated</p>
                  <p className="text-sm text-foreground/80">
                    Mid-semester report • Yesterday
                  </p>
                </div>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Classes</h3>
              <Link
                href="/schedule"
                className="text-primary-accent hover:underline text-sm font-medium"
              >
                View schedule
              </Link>
            </div>
            <ul className="divide-y divide-border-color">
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-primary-accent rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">CS</span>
                  </div>
                  <div>
                    <p className="font-medium">Computer Science 202</p>
                    <p className="text-sm text-foreground/80">
                      10:00 AM - 11:30 AM
                    </p>
                  </div>
                </div>
                <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">
                  Ready
                </span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-secondary-accent rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">DB</span>
                  </div>
                  <div>
                    <p className="font-medium">Database Systems</p>
                    <p className="text-sm text-foreground/80">
                      1:00 PM - 2:30 PM
                    </p>
                  </div>
                </div>
                <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full">
                  Device Check
                </span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-accent rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">AI</span>
                  </div>
                  <div>
                    <p className="font-medium">Artificial Intelligence</p>
                    <p className="text-sm text-foreground/80">
                      3:00 PM - 4:30 PM
                    </p>
                  </div>
                </div>
                <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">
                  Ready
                </span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    <span className="font-semibold">SE</span>
                  </div>
                  <div>
                    <p className="font-medium">Software Engineering</p>
                    <p className="text-sm text-foreground/80">
                      Tomorrow, 9:00 AM
                    </p>
                  </div>
                </div>
                <span className="bg-blue-500/10 text-blue-500 text-xs px-2 py-1 rounded-full">
                  Upcoming
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
