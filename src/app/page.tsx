import PageHeading from "@/components/PageHeading";
import DashboardCard from "@/components/DashboardCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";

import initialCourses from "@/data/jsons/courses.json";
import initialDevices from "@/data/jsons/devices.json";
import initialRooms from "@/data/jsons/rooms.json";


export default function HomePage() {
  return (
    <section>
      <PageHeading title="Dashboard Overview" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Courses"
          value={initialCourses.length}
          icon={
            <FontAwesomeIcon icon={faBook} className="w-8 h-8 text-blue-500" />
          }
        />
        <DashboardCard
          title="Active Devices"
          value={initialDevices.filter((d) => d.status === "online").length}
          icon={
            <FontAwesomeIcon
              icon={faPhone}
              className="w-8 h-8 text-green-500"
            />
          }
        />
        <DashboardCard
          title="Rooms Available"
          value={initialRooms.length}
          icon={
            <FontAwesomeIcon
              icon={faUsers}
              className="w-8 h-8 text-purple-500"
            />
          }
        />
      </div>
    </section>
  );
}
