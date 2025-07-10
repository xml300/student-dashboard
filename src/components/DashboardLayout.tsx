import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden rounded-l-3xl shadow-custom-heavy">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
