import Sidenav from "../ui/dashboard/sidenav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Fixed dashboard sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-50">
        <Sidenav />
      </aside>

      {/* Everything to the right of sidebar */}
      <main className="ml-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}