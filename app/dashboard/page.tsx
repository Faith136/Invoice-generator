//import Sidenav from "../ui/dashboard/sidenav"

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  descriptionClass?: string;
};

const stats: StatCardProps[] = [
  {
    title: "Outstanding",
    value: "KES 486,200",
    description: "Across 6 unpaid invoices",
  },
  {
    title: "Past due",
    value: "KES 118,500",
    description: "2 invoices, oldest 34 days",
    descriptionClass: "text-rose-400",
  },
  {
    title: "Collected in September",
    value: "KES 312,000",
    description: "+18% on August",
    descriptionClass: "text-emerald-400",
  },
  {
    title: "Average days to pay",
    value: "21",
    description: "+4 days on last quarter",
    descriptionClass: "text-rose-400",
  },
];

export default function DashboardPage() {
  return (
        <div className="min-h-screen bg-[#090d12] text-white">
      <div className="flex min-h-screen">
             <main className="flex-1 overflow-y-auto px-8 py-8">
          {/* Header */}
          <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Good morning, Admin
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Six invoices are waiting on payment. Two are past due.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-700 bg-[#111923] px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Record a payment
              </button>

              <button
                type="button"
                className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600"
              >
                New invoice
              </button>
            </div>
          </header>

                   </main>
         </div>
           </div>
             )
}