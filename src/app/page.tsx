export default function HomePage() {
  return (
      <section>
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Responsive grid */}
              <div className="bg-white shadow-md rounded-md p-4">
                  <h3 className="font-semibold mb-2">Total Courses</h3>
                  <p className="text-xl">15</p>
              </div>
              <div className="bg-white shadow-md rounded-md p-4">
                  <h3 className="font-semibold mb-2">Active Devices</h3>
                  <p className="text-xl">22</p>
              </div>
              <div className="bg-white shadow-md rounded-md p-4">
                  <h3 className="font-semibold mb-2">Rooms Available</h3>
                  <p className="text-xl">10</p>
              </div>
              {/* Add more dashboard widgets/cards here */}
          </div>
      </section>
  );
}